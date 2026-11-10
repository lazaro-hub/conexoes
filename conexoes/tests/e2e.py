"""Teste de ponta a ponta: joga as 18 missões em tela de celular e confere progresso, navegação e área do pesquisador.
Uso: python3 tests/e2e.py [pasta_de_capturas]
"""
import json, os, random, sys, pathlib
from playwright.sync_api import sync_playwright

RAIZ = pathlib.Path(__file__).resolve().parents[1]
PAGINA = (RAIZ / 'dist' / 'teste-local.html').as_uri()
CAPT = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else RAIZ / 'tests' / 'capturas')
CAPT.mkdir(parents=True, exist_ok=True)
random.seed(7)

erros, problemas = [], []

def checar_largura(page, onde):
    sw, cw = page.evaluate('[document.documentElement.scrollWidth, document.documentElement.clientWidth]')
    if sw > cw + 1:
        problemas.append(f'Rolagem horizontal em {onde}: {sw} > {cw}')

def foto(page, nome, cheia=False):
    page.wait_for_timeout(500)  # deixa as animações de entrada terminarem
    page.screenshot(path=str(CAPT / f'{nome}.png'), full_page=cheia)

with sync_playwright() as p:
    nav = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    ctx = nav.new_context(viewport={'width': 375, 'height': 812}, device_scale_factor=2, is_mobile=True, has_touch=True)
    page = ctx.new_page()
    page.on('console', lambda m: erros.append(f'console.{m.type}: {m.text}') if m.type == 'error' and 'Failed to load resource' not in m.text else None)  # fontes externas podem falhar offline
    page.on('pageerror', lambda e: erros.append(f'pageerror: {e}'))
    page.goto(PAGINA)
    page.wait_for_selector('h1:has-text("CONEXÕES")')
    checar_largura(page, 'início'); foto(page, '01-inicio')

    # Identificação
    page.get_by_role('button', name='Começar jornada').click()
    page.get_by_role('button', name='Continuar').click()
    assert page.get_by_role('alert').is_visible(), 'validação de apelido não apareceu'
    page.fill('#campo-codigo', 'ENF-TESTE')
    page.fill('#campo-apelido', 'Ana')
    page.get_by_role('button', name='Continuar').click()
    page.get_by_role('button', name='Cacheado').click()
    page.get_by_role('button', name='Tom de pele 5').click()
    page.get_by_role('button', name='Óculos').click()
    checar_largura(page, 'crachá'); foto(page, '02-cracha')
    page.get_by_role('button', name='Entrar no estágio').click()
    page.wait_for_selector('text=Próxima missão')
    checar_largura(page, 'hub'); foto(page, '03-hub')

    # Módulo 2 deve estar bloqueado no começo
    assert page.locator('button:has-text("Equipe em campo")').is_disabled(), 'Módulo 2 deveria estar bloqueado'

    feitas = 0
    capturou = set()
    page.locator('button:has-text("Próxima missão")').first.click()
    while feitas < 18:
        page.wait_for_selector('p:has-text("Ficha da missão")')
        if feitas == 0: checar_largura(page, 'ficha'); foto(page, '04-ficha', cheia=True)
        page.get_by_role('button', name='Iniciar missão').click()
        passos = 0
        while not page.locator('text=Missão concluída').count():
            passos += 1
            if passos > 60: raise RuntimeError('missão travada')
            cont = page.locator('[data-acao="continuar"]')
            if cont.count():
                if feitas == 0 and 'dialogo' not in capturou:
                    capturou.add('dialogo'); checar_largura(page, 'diálogo'); foto(page, '05-dialogo')
                cont.first.click(); continue
            if page.locator('text=Sua decisão').count():
                opcoes = page.locator('button:has(span.font-mono)')
                if feitas == 0 and 'escolha' not in capturou:
                    capturou.add('escolha'); foto(page, '06-escolha', cheia=True)
                n = opcoes.count(); assert n == 4, f'esperadas 4 alternativas, vieram {n}'
                opcoes.nth(random.randrange(4)).click(); continue
            prox = page.get_by_role('button', name='Próxima etapa')
            fim = page.get_by_role('button', name='Ver resultado da missão')
            if prox.count() or fim.count():
                if feitas < 6:
                    page.get_by_role('button', name='Comparar com as outras condutas').click()
                    assert page.locator('text=sua escolha').count() == 1
                if feitas == 0 and 'feedback' not in capturou:
                    capturou.add('feedback'); checar_largura(page, 'feedback'); foto(page, '07-feedback', cheia=True)
                (prox if prox.count() else fim).click()
        feitas += 1
        if feitas == 1: checar_largura(page, 'resultado'); foto(page, '08-resultado', cheia=True)
        if feitas == 4: foto(page, '09-resultado-fim-modulo', cheia=True)
        seguinte = page.locator('button:has-text("Próxima missão:")')
        if seguinte.count():
            seguinte.click()
        else:
            page.get_by_role('button', name='Ver meu progresso').click()
            break

    # Progresso salvo
    dados = json.loads(page.evaluate("localStorage.getItem('conexoes:v1')"))
    j = dados['jogadores']['ENF-TESTE']
    concl = {t['missaoId'] for t in j['tentativas']}
    assert len(concl) == 18, f'esperadas 18 missões concluídas, salvas {len(concl)}'
    page.wait_for_selector('text=Por eixo')
    checar_largura(page, 'progresso'); foto(page, '10-progresso', cheia=True)

    # Repetir uma missão pelo histórico
    page.get_by_role('button', name='Histórico').click()
    page.locator('button:has-text("Repetir")').first.click()
    page.get_by_role('button', name='Repetir missão').click()
    page.get_by_role('button', name='Sair da missão').click()
    page.get_by_role('button', name='Continuar jogando').click()
    assert page.locator('text=Etapa').count()
    page.get_by_role('button', name='Sair da missão').click()
    page.get_by_role('dialog').get_by_role('button', name='Sair').click()
    page.wait_for_selector('p:has-text("Ficha da missão")')

    # Recarregar mantém o progresso
    page.reload(); page.wait_for_selector('text=de 18 missões')
    assert page.locator('text=Jornada concluída').count(), 'após recarregar, a jornada deveria aparecer como concluída'
    page.get_by_role('button', name='Conquistas').click(); foto(page, '11-conquistas', cheia=True)

    # Código de envio
    page.get_by_role('button', name='Progresso').click()
    page.get_by_role('button', name='Gerar código de resultados').click()
    codigo = page.input_value('#codigo-envio')
    assert codigo.startswith('CNX1.'), 'código de envio inválido'

    # Trocar participante e entrar na área do pesquisador
    page.get_by_role('button', name='Trocar').click()
    page.get_by_role('dialog').get_by_role('button', name='Trocar').click()
    page.wait_for_selector('text=Continuar neste dispositivo')
    page.get_by_role('button', name='Área do pesquisador').click()
    page.fill('#campo-pin', 'errado'); page.get_by_role('button', name='Entrar').click()
    assert page.get_by_role('alert').is_visible()
    page.fill('#campo-pin', 'CONEXOES2026'); page.get_by_role('button', name='Entrar').click()
    page.wait_for_selector('text=Desempenho por eixo')
    page.fill('#campo-import', codigo.replace('ENF-TESTE', 'X'))  # sem efeito: o código é base64
    page.fill('#campo-import', 'CNX1.lixo')
    page.get_by_role('button', name='Importar').click()
    assert page.get_by_role('alert').is_visible(), 'código inválido deveria mostrar erro'
    page.fill('#campo-import', codigo)
    page.get_by_role('button', name='Importar').click()
    page.wait_for_selector('text=ENF-TESTE (importado)')
    checar_largura(page, 'admin'); foto(page, '12-admin', cheia=True)
    page.get_by_role('button', name='Exportar CSV').click()
    page.check('#campo-liberar')

    # Visual no escuro e no computador
    dark = nav.new_context(viewport={'width': 1280, 'height': 860}, color_scheme='dark')
    pg = dark.new_page()
    pg.on('pageerror', lambda e: erros.append(f'pageerror(dark): {e}'))
    pg.goto(PAGINA)
    pg.evaluate("localStorage.setItem('conexoes:v1', %s)" % json.dumps(json.dumps(dados)))
    pg.reload(); pg.wait_for_selector('text=de 18 missões')
    foto(pg, '13-hub-escuro-desktop')
    pg.locator('button:has-text("Raciocínio no plantão")').click()
    pg.locator('button:has-text("É da idade?")').click()
    pg.get_by_role('button', name='Repetir missão').click()
    for _ in range(3): pg.locator('[data-acao="continuar"]').click()
    foto(pg, '14-missao-escuro-desktop')
    for _ in range(2):
        if pg.locator('[data-acao="continuar"]').count(): pg.locator('[data-acao="continuar"]').click()
    pg.locator('button:has(span.font-mono)').nth(0).click()
    while pg.locator('[data-acao="continuar"]').count(): pg.locator('[data-acao="continuar"]').click()
    foto(pg, '15-feedback-escuro-desktop', cheia=True)
    dark.close()

    # Celular estreito (360 px)
    est = nav.new_context(viewport={'width': 360, 'height': 740}, is_mobile=True)
    ps = est.new_page(); ps.goto(PAGINA)
    ps.evaluate("localStorage.setItem('conexoes:v1', %s)" % json.dumps(json.dumps(dados)))
    ps.reload(); ps.wait_for_selector('text=de 18 missões'); checar_largura(ps, 'hub 360')
    ps.locator('button:has-text("Equipe em campo")').click(); checar_largura(ps, 'módulo 360')
    ps.locator('button:has-text("Tensão no posto")').click()
    ps.get_by_role('button', name='Repetir missão').click()
    for _ in range(4): ps.locator('[data-acao="continuar"]').click()
    checar_largura(ps, 'escolha 360'); foto(ps, '16-escolha-360', cheia=True)
    est.close()
    nav.close()

print(f'Missões jogadas: 18 · capturas em {CAPT}')
if problemas: print('PROBLEMAS:\n  ' + '\n  '.join(problemas))
if erros: print('ERROS:\n  ' + '\n  '.join(erros[:20]))
print('OK' if not problemas and not erros else 'FALHOU')
sys.exit(0 if not problemas and not erros else 1)
