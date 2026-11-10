import type { Missao } from '../../types';
import { n, op, p } from './helpers';

// EIXO 4: Desenvolvimento pessoal e profissional

export const EIXO4: Missao[] = [
  {
    id: 'm14',
    eixo: 'e4',
    numero: 14,
    habilidade: 'Autonomia',
    titulo: 'Primeiro curativo',
    objetivo: 'Assumir a responsabilidade pela própria preparação e reconhecer, durante a prática, os momentos que exigem consulta à supervisão.',
    contexto: 'Preparação para o primeiro curativo em ferida cirúrgica no estágio supervisionado.',
    situacaoProblema:
      'Você fará um curativo pela primeira vez na segunda-feira. Um colega sugere esperar a demonstração da professora. Durante o procedimento, surge um achado inesperado.',
    comportamentos: ['Busca fontes confiáveis por conta própria', 'Pratica e identifica as próprias dúvidas', 'Reconhece limites e consulta no momento certo'],
    local: 'Laboratório de habilidades · sexta, 16h',
    cena: 'laboratorio',
    personagens: ['rafael', 'helena'],
    medidor: 'Preparo para a prática',
    etapas: [
      {
        id: 'm14e1',
        situacao: [
          n('Na segunda-feira, você fará pela primeira vez, sob supervisão, um curativo em uma ferida cirúrgica.'),
          p('rafael', 'neutro', 'Relaxa. Na hora a professora mostra como faz. Eu nem vou estudar.'),
        ],
        desafio: 'Como você se prepara?',
        opcoes: [
          op(
            'adequada',
            'Reviso o protocolo da instituição e o material da disciplina, pratico no laboratório e anoto minhas dúvidas.',
            [n('No laboratório, você percebe que tem dúvida sobre a sequência de limpeza da ferida e anota para perguntar.')],
            'Autonomia na formação é assumir a responsabilidade pela própria aprendizagem: buscar fontes confiáveis, praticar e identificar as próprias dúvidas antes da prática real.',
          ),
          op(
            'parcial',
            'Assisto a vídeos de curativo na internet durante o fim de semana, para chegar com a técnica bem visualizada.',
            [n('Você assiste a três vídeos com técnicas diferentes e fica em dúvida sobre qual seguir.')],
            'Buscar conhecimento por conta própria é positivo, mas fontes sem critério de qualidade podem divergir do protocolo da instituição. Autonomia inclui escolher boas fontes.',
          ),
          op(
            'pouco',
            'Combino com o Rafael de esperar a demonstração da professora na segunda, que vai mostrar o jeito certo de fazer.',
            [p('rafael', 'feliz', 'Isso! Sem estresse.')],
            'Contar apenas com a demonstração no dia transfere toda a responsabilidade da aprendizagem para a professora e aumenta a insegurança na hora do procedimento.',
          ),
          op(
            'inadequada',
            'Peço para ficar com outro paciente, sem curativo, para não colocar ninguém em risco com a minha inexperiência.',
            [p('helena', 'preocupado', '{nome}, essa é uma oportunidade importante para você.')],
            'Evitar a situação adia o desenvolvimento da competência. A insegurança diminui com preparo e prática supervisionada, e não com a fuga da experiência.',
          ),
        ],
      },
      {
        id: 'm14e2',
        cena: 'enfermaria',
        situacao: [
          n('Segunda-feira, no estágio. O material está separado.'),
          p('helena', 'neutro', 'Pode começar. Estou aqui, mas quero ver você conduzir.'),
          n('Ao retirar o curativo anterior, você percebe uma secreção diferente do que esperava e fica em dúvida se pode continuar.'),
        ],
        desafio: 'O que você faz?',
        opcoes: [
          op(
            'adequada',
            'Interrompo, descrevo à professora o que observei e pergunto como proceder antes de continuar.',
            [p('helena', 'feliz', 'Ótima observação. Vamos avaliar juntos e registrar esse aspecto da ferida.')],
            'Autonomia não é fazer tudo sem ajuda: é conduzir com responsabilidade e reconhecer quando é preciso consultar. Comunicar o achado protege o paciente e qualifica o registro.',
          ),
          op(
            'parcial',
            'Continuo o curativo como planejado, para não deixar a ferida exposta, e comento a secreção com a professora no final.',
            [p('helena', 'neutro', 'Essa observação precisava vir antes de você continuar.')],
            'Você comunicou o achado, o que é importante, mas no momento errado. Alterações na ferida podem mudar a conduta e precisam ser avaliadas antes de seguir.',
          ),
          op(
            'pouco',
            'Peço que a professora termine o curativo, porque perdi a segurança depois de ver a secreção.',
            [p('helena', 'neutro', 'Posso ajudar, mas quero que você continue comigo.')],
            'Reconhecer a insegurança é honesto, mas entregar o procedimento abre mão da oportunidade de aprender com supervisão. Perguntar e continuar seria o caminho.',
          ),
          op(
            'inadequada',
            'Decido por conta própria trocar a cobertura por outra que, pelo que lembro da aula, é indicada para secreção.',
            [p('helena', 'tenso', 'Espera. A escolha da cobertura depende da avaliação da ferida e do protocolo.')],
            'Tomar uma decisão terapêutica sem avaliação e sem consulta confunde autonomia com independência. Na formação, a autonomia se desenvolve dentro da supervisão.',
          ),
        ],
      },
    ],
    justificativa:
      'Autonomia, na formação em Enfermagem, é a capacidade de dirigir a própria aprendizagem e atuação com responsabilidade: preparar-se, buscar fontes confiáveis, praticar e reconhecer os limites que exigem consulta e supervisão.',
    paraRefletir: 'Na próxima prática, qual procedimento você pode estudar e treinar antes, sem esperar que alguém peça?',
  },

  {
    id: 'm15',
    eixo: 'e4',
    numero: 15,
    habilidade: 'Iniciativa',
    titulo: 'Sol, prato e lua',
    objetivo: 'Perceber uma necessidade não solicitada, propor uma ação e implementá-la com planejamento e validação da equipe.',
    contexto: 'Estágio na Unidade Básica de Saúde, em uma tarde com menos demandas para os estudantes.',
    situacaoProblema:
      'Suas atividades terminaram mais cedo. Na sala de espera, você ouve um usuário idoso dizer que se confunde com os horários dos remédios.',
    comportamentos: ['Identifica necessidades sem ser solicitado', 'Propõe ações e comunica à equipe', 'Valida e testa antes de ampliar'],
    local: 'UBS Jardim das Flores · quarta, 15h',
    cena: 'ubs',
    personagens: ['joaquim', 'tania'],
    medidor: 'Contribuição para o cuidado',
    etapas: [
      {
        id: 'm15e1',
        situacao: [
          n('Suas atividades do dia terminaram mais cedo. A equipe está ocupada com a fila da farmácia.'),
          n('Na sala de espera, você ouve Seu Joaquim comentar com outra usuária que confunde os horários dos remédios.'),
          p('joaquim', 'preocupado', 'São quatro remédios. Um é de manhã, outro é de doze em doze... Eu me perco todo.'),
        ],
        desafio: 'O que você faz com o tempo livre e com o que ouviu?',
        opcoes: [
          op(
            'adequada',
            'Conto à Enf. Tânia o que ouvi do Seu Joaquim e proponho conversar com ele, com a orientação dela.',
            [p('tania', 'feliz', 'Que bom que você reparou. Vai lá, e depois me conta o que viu.')],
            'Iniciativa é agir antes de ser solicitado, identificando necessidades e oportunidades. Combinar com a enfermeira garante que a ação seja integrada ao trabalho da equipe.',
          ),
          op(
            'parcial',
            'Ofereço ajuda na fila da farmácia, que está grande, já que é ali que a equipe mais precisa agora.',
            [p('tania', 'neutro', 'Ajuda, sim. Obrigada.'), n('Seu Joaquim vai embora sem que ninguém fale com ele.')],
            'Oferecer ajuda à equipe é uma boa atitude, mas a necessidade que você identificou ficou sem resposta. Iniciativa também é dar visibilidade ao que só você percebeu.',
          ),
          op(
            'pouco',
            'Aguardo que alguém me passe uma nova tarefa, para não atrapalhar a rotina da equipe com algo fora do combinado.',
            [n('Ninguém lembra de você por 40 minutos.')],
            'Esperar instruções parece seguro, mas desperdiça oportunidades de aprendizagem e de cuidado. Em campo, a iniciativa do estudante é valorizada quando vem acompanhada de comunicação.',
          ),
          op(
            'inadequada',
            'Aproveito o tempo livre para revisar o conteúdo da prova no celular até o fim do horário de estágio.',
            [n('Seu Joaquim passa por você e pergunta algo, mas você não percebe.')],
            'O tempo em campo é tempo de aprendizagem e de cuidado. Desconectar-se do ambiente impede de perceber necessidades que estão bem à sua frente.',
          ),
        ],
      },
      {
        id: 'm15e2',
        situacao: [
          n('Conversando com Seu Joaquim, você percebe que outros idosos têm a mesma dificuldade e tem uma ideia: uma tabela com desenhos (sol, prato e lua) para indicar os horários.'),
          p('joaquim', 'feliz', 'Com desenho eu entendo! Faz uma dessas pra mim?'),
        ],
        desafio: 'Como você leva a ideia adiante?',
        opcoes: [
          op(
            'adequada',
            'Faço um modelo, peço à Enf. Tânia que confira com as prescrições e proponho testar com alguns idosos.',
            [p('tania', 'feliz', 'Excelente. Vamos validar com o farmacêutico também e testar com cinco usuários.')],
            'Uma boa iniciativa vem acompanhada de planejamento e validação. Envolver a equipe garante segurança, porque as informações precisam corresponder às prescrições, e aumenta a chance de a ideia ser adotada.',
          ),
          op(
            'parcial',
            'Faço a tabela só para o Seu Joaquim, com base no que ele me contou sobre cada remédio e seus horários.',
            [p('tania', 'preocupado', 'Você conferiu os horários com a prescrição dele?')],
            'Responder à necessidade dele é positivo, mas montar a tabela apenas com base no relato pode reproduzir erros. Toda orientação sobre medicamentos precisa ser conferida.',
          ),
          op(
            'pouco',
            'Guardo a ideia para propor no próximo semestre, quando eu tiver mais experiência e conhecer melhor a equipe.',
            [p('joaquim', 'triste', 'Ah... tá bom.')],
            'Esperar o momento ideal costuma significar não agir. A ideia era simples e útil e poderia ser desenvolvida agora, com apoio da equipe.',
          ),
          op(
            'inadequada',
            'Imprimo tabelas com horários comuns, como 8h e 20h, e distribuo na sala de espera para todos os idosos.',
            [n('Uma usuária passa a tomar um remédio no horário da tabela genérica, e não no horário prescrito.')],
            'Iniciativa sem validação pode gerar risco. Materiais sobre medicamentos precisam ser individualizados e conferidos pela equipe.',
          ),
        ],
      },
    ],
    justificativa:
      'Iniciativa envolve perceber necessidades e oportunidades, propor ações e colocá-las em prática com planejamento. Em serviços de saúde, a iniciativa do estudante se torna segura e efetiva quando é comunicada e integrada à equipe.',
    paraRefletir: 'Que necessidade você já percebeu no seu campo de prática e ainda não comunicou a ninguém?',
  },

  {
    id: 'm16',
    eixo: 'e4',
    numero: 16,
    habilidade: 'Adaptabilidade',
    titulo: 'Mudança de rota',
    objetivo: 'Ajustar-se rapidamente a uma mudança de planos e adaptar orientações à realidade de uma família, sem abrir mão da segurança.',
    contexto: 'Estágio na Atenção Primária, com atividade cancelada e substituída por visitas domiciliares.',
    situacaoProblema:
      'A atividade que você preparou é cancelada de última hora. Na visita domiciliar, a orientação de alta não cabe na realidade da família.',
    comportamentos: ['Redireciona o foco para o novo objetivo', 'Busca informações sobre a nova situação', 'Adapta o plano à realidade, com segurança'],
    local: 'Visita domiciliar · terça, 9h',
    cena: 'domicilio',
    personagens: ['tania', 'zilda', 'neto'],
    medidor: 'Flexibilidade',
    etapas: [
      {
        id: 'm16e1',
        cena: 'ubs',
        situacao: [
          n('Você preparou durante a semana uma atividade educativa em uma escola do bairro. Na manhã do estágio, a escola cancela.'),
          p('tania', 'neutro', 'Mudança de planos: hoje vocês vão comigo nas visitas domiciliares. A primeira é na casa de Dona Zilda, que teve alta ontem.'),
        ],
        desafio: 'Como você reage à mudança?',
        opcoes: [
          op(
            'adequada',
            'Aceito a mudança, pergunto sobre o caso de Dona Zilda e o objetivo da visita e me preparo no caminho.',
            [p('tania', 'feliz', 'Ela teve alta com um medicamento novo e mora com o neto. O objetivo é ver como estão se organizando.')],
            'Adaptabilidade é ajustar-se rapidamente às mudanças, redirecionando a energia para o novo objetivo. Buscar informações sobre a nova situação mostra flexibilidade com responsabilidade.',
          ),
          op(
            'parcial',
            'Aceito, mas peço para remarcar logo a atividade da escola, para não perder o material que preparei durante a semana.',
            [p('tania', 'neutro', 'A gente vê isso depois. Agora, vamos.')],
            'Preocupar-se com o trabalho preparado é legítimo, mas o foco no plano anterior atrasa o engajamento na nova tarefa. Primeiro adaptar, depois retomar o que for possível.',
          ),
          op(
            'pouco',
            'Acompanho a enfermeira, mas comento com os colegas que o dia de estágio acabou sendo perdido.',
            [n('Você chega à visita sem saber quem é Dona Zilda nem por que está ali.')],
            'Seguir a mudança sem engajamento reduz o aproveitamento da experiência. A frustração é compreensível, mas tratar a nova atividade como perda impede de ver o que ela pode ensinar.',
          ),
          op(
            'inadequada',
            'Peço para ficar na UBS adiantando os relatórios, já que não me preparei para fazer visitas hoje.',
            [p('tania', 'preocupado', 'Visita domiciliar faz parte da formação, {nome}. É uma ótima oportunidade.')],
            'Evitar a nova situação por falta de preparo prévio limita o desenvolvimento profissional. Na saúde, imprevistos são frequentes, e a capacidade de se ajustar faz parte do trabalho.',
          ),
        ],
      },
      {
        id: 'm16e2',
        situacao: [
          n('Na casa de Dona Zilda. A orientação de alta diz para guardar um dos medicamentos na geladeira. A geladeira está quebrada há uma semana.'),
          p('zilda', 'preocupado', 'Eu deixo o remédio em cima da mesa, meu bem. Geladeira, só no mês que vem.'),
          p('neto', 'neutro', 'A gente não tem como comprar outra agora.'),
        ],
        desafio: 'Como você adapta a orientação?',
        opcoes: [
          op(
            'adequada',
            'Converso sobre as possibilidades da casa e da vizinhança e levo a situação à Enf. Tânia para definir uma alternativa segura.',
            [
              p('neto', 'aliviado', 'A vizinha da frente tem geladeira. Ela já ajudou a gente antes.'),
              p('tania', 'neutro', 'Ótimo. Vou confirmar com a farmácia da UBS como esse medicamento pode ser armazenado até lá.'),
            ],
            'Adaptar é ajustar o plano à realidade da família sem abrir mão da segurança. Envolver a equipe garante que a alternativa seja adequada ao medicamento.',
          ),
          op(
            'parcial',
            'Repito a orientação da alta e explico com calma por que o remédio precisa ficar na geladeira, para a família entender o risco.',
            [p('zilda', 'triste', 'Eu entendo, mas não tenho geladeira...')],
            'Explicar a razão é importante, mas repetir uma orientação inviável não resolve. A orientação precisa caber na realidade da família.',
          ),
          op(
            'pouco',
            'Oriento guardar o remédio no lugar mais fresco da casa, longe do sol, até a geladeira ser consertada.',
            [p('tania', 'preocupado', 'Depende do medicamento. Isso precisa ser verificado antes de orientar.')],
            'A tentativa de adaptar é válida, mas sugerir uma alternativa sem verificar as características do medicamento pode comprometer a eficácia do tratamento.',
          ),
          op(
            'inadequada',
            'Registro que a família não conseguiu seguir a orientação e sigo para a próxima visita, que já está atrasada.',
            [n('Dona Zilda continua guardando o medicamento em cima da mesa.')],
            'Registrar sem agir responsabiliza a família por uma condição social e deixa o problema sem solução. Adaptar o cuidado à realidade é parte da responsabilidade da equipe.',
          ),
        ],
      },
    ],
    justificativa:
      'Adaptabilidade é a capacidade de ajustar planos, comportamentos e estratégias diante de mudanças e de realidades diferentes das previstas. Na Atenção Primária, adaptar as orientações às condições de vida das famílias é condição para um cuidado efetivo e seguro.',
    paraRefletir: 'Lembre de uma mudança de planos recente. O que você fez nos primeiros minutos, e o que faria diferente?',
  },

  {
    id: 'm17',
    eixo: 'e4',
    numero: 17,
    habilidade: 'Autorregulação emocional',
    titulo: 'Respirar antes de responder',
    objetivo: 'Perceber as próprias reações emocionais, modular a resposta em uma situação de tensão e buscar apoio adequado depois.',
    contexto: 'Estágio na clínica médica, em um dia com intercorrências que atrasaram a rotina.',
    situacaoProblema:
      'O acompanhante de um paciente grita com você por causa de um atraso na medicação. Depois do turno, a cena continua mexendo com você.',
    comportamentos: ['Percebe as próprias reações', 'Mantém tom e postura calmos', 'Busca apoio em espaços adequados'],
    local: 'Corredor da clínica médica · quinta, 11h',
    cena: 'corredor',
    personagens: ['valdir', 'marcos', 'bia'],
    medidor: 'Equilíbrio emocional',
    etapas: [
      {
        id: 'm17e1',
        situacao: [
          n('A medicação do pai do Sr. Valdir está atrasada por causa de uma intercorrência no setor.'),
          p('valdir', 'tenso', 'Você de novo? Meu pai está com dor há meia hora! Vocês são uns incompetentes! Vou denunciar todo mundo!'),
          n('Você sente o rosto esquentar e o coração acelerar.'),
        ],
        desafio: 'Qual é a sua reação?',
        opcoes: [
          op(
            'adequada',
            'Respiro fundo, mantenho a voz baixa, reconheço a preocupação dele e aciono agora o enfermeiro da medicação.',
            [p('valdir', 'neutro', '...Tá. Mas rápido, por favor.'), p('marcos', 'neutro', 'Sr. Valdir, estou indo agora até o seu pai.')],
            'Perceber as próprias reações (rosto quente, coração acelerado) e fazer uma pausa antes de responder é o núcleo da autorregulação emocional. A calma de quem atende ajuda a reduzir a tensão de quem está aflito.',
          ),
          op(
            'parcial',
            'Explico que não tenho culpa pelo atraso e que estou fazendo o meu melhor, para ele entender o que está acontecendo no setor.',
            [p('valdir', 'tenso', 'Aqui ninguém tem culpa de nada!')],
            'Defender-se é uma reação natural, mas tira o foco da necessidade do paciente e o coloca em você. Responder à dor do pai, e não à ofensa, tende a acalmar a situação.',
          ),
          op(
            'pouco',
            'Fico em silêncio e me afasto, para não piorar a discussão enquanto ele está tão alterado.',
            [n('O Sr. Valdir fica ainda mais irritado e vai ao posto reclamar.')],
            'Afastar-se pode ser uma forma de proteção, mas sem nenhuma resposta a necessidade dele fica sem encaminhamento. É possível pedir um momento e garantir que alguém responda.',
          ),
          op(
            'inadequada',
            'Digo com firmeza, no mesmo tom que ele, que ele não pode falar assim com a equipe de enfermagem.',
            [p('valdir', 'tenso', 'Ah, agora vai gritar comigo também?')],
            'Responder no mesmo tom aumenta o conflito e pode comprometer a segurança de todos. Limites podem ser colocados, mas com voz calma e depois de acolher a necessidade.',
          ),
        ],
      },
      {
        id: 'm17e2',
        situacao: [
          n('No fim do turno, a cena continua na sua cabeça. Suas mãos ainda tremem um pouco.'),
          p('bia', 'preocupado', 'Tá tudo bem? Você não falou mais nada depois daquela situação.'),
        ],
        desafio: 'O que você faz com o que está sentindo?',
        opcoes: [
          op(
            'adequada',
            'Converso com a Bia sobre como me senti e relato o episódio à professora, perguntando como lidar com isso.',
            [
              p('bia', 'aliviado', 'Comigo também já aconteceu. A professora tem umas dicas boas.'),
              n('Na conversa com a Profa. Helena, você descobre que a universidade tem um serviço de apoio psicológico para estudantes.'),
            ],
            'Reconhecer e nomear as emoções, buscar apoio e transformar a experiência em aprendizagem são estratégias de autorregulação. Pedir ajuda é um comportamento profissional, e não sinal de fraqueza.',
          ),
          op(
            'parcial',
            'Digo que está tudo bem e tento esquecer o assunto, para não levar o problema do estágio para casa.',
            [n('À noite, você não consegue dormir pensando na cena.')],
            'Suprimir as emoções pode funcionar no curto prazo, mas não as resolve. Falar sobre o ocorrido ajuda a processá-lo e a se preparar para situações parecidas.',
          ),
          op(
            'pouco',
            'Desabafo no grupo de mensagens da turma, contando o que aconteceu, com detalhes do paciente e do acompanhante.',
            [p('bia', 'preocupado', 'Melhor apagar isso. Tem informação do paciente aí.')],
            'Desabafar é saudável, mas expor detalhes de pacientes, mesmo em grupos fechados, fere o sigilo profissional. Escolha pessoas e espaços adequados para falar sobre o que sentiu.',
          ),
          op(
            'inadequada',
            'Publico nas redes sociais um desabafo sobre acompanhantes mal-educados, citando o hospital onde faço estágio.',
            [n('A publicação circula e chega à coordenação do curso.')],
            'Publicações sobre pacientes, familiares ou instituições nas redes sociais contrariam o Código de Ética dos Profissionais de Enfermagem e expõem pessoas. Regular as emoções inclui escolher como e onde expressar o que se sente.',
          ),
        ],
      },
    ],
    justificativa:
      'Autorregulação emocional é a capacidade de perceber as próprias emoções, modular as reações no momento e buscar estratégias e apoio depois. Em situações de tensão, ela protege a relação com pacientes e familiares, a segurança do cuidado e a saúde mental do estudante.',
    paraRefletir: 'Quais sinais do seu corpo avisam que você está perdendo a calma? O que você pode fazer nos primeiros dez segundos?',
  },

  {
    id: 'm18',
    eixo: 'e4',
    numero: 18,
    habilidade: 'Aprendizagem contínua',
    titulo: 'Depois do retorno',
    objetivo: 'Receber um retorno com abertura, transformá-lo em metas concretas e buscar atualização ativa em fontes confiáveis.',
    contexto: 'Avaliação final de um estágio e início de um novo campo de prática no semestre seguinte.',
    situacaoProblema:
      'A professora aponta que suas anotações de enfermagem estão incompletas. No estágio seguinte, você descobre que um protocolo mudou em relação ao que aprendeu em aula.',
    comportamentos: ['Recebe críticas com abertura', 'Transforma o retorno em metas concretas', 'Busca atualização em fontes oficiais'],
    local: 'Sala de avaliação do estágio · sexta, 17h',
    cena: 'sala-aula',
    personagens: ['helena', 'marcos'],
    medidor: 'Evolução profissional',
    etapas: [
      {
        id: 'm18e1',
        situacao: [
          n('Fim do estágio. Na avaliação individual, a Profa. Helena dá a você um retorno.'),
          p('helena', 'neutro', 'Seu cuidado com os pacientes foi muito bom. Mas suas anotações de enfermagem estão incompletas: faltam horários, dados objetivos e, às vezes, a sua identificação.'),
        ],
        desafio: 'Como você recebe esse retorno?',
        opcoes: [
          op(
            'adequada',
            'Agradeço, peço um exemplo de anotação minha que poderia melhorar e pergunto que referências devo estudar.',
            [p('helena', 'feliz', 'Claro. Olha esta: "paciente bem, sem queixas". O que falta aqui? Vou te indicar as recomendações do conselho sobre registros.')],
            'Receber críticas com abertura e transformá-las em perguntas específicas é a base da aprendizagem contínua. O retorno vira um plano concreto de melhoria.',
          ),
          op(
            'parcial',
            'Agradeço o retorno e digo que vou prestar mais atenção nas próximas anotações que eu fizer no estágio.',
            [p('helena', 'neutro', 'Ótimo. O que exatamente você vai fazer diferente?')],
            'A receptividade é positiva, mas uma intenção genérica não define o que mudar. Pedir exemplos e referências tornaria o retorno mais útil.',
          ),
          op(
            'pouco',
            'Explico que, no ritmo do estágio, não havia tempo suficiente para registrar tudo com o nível de detalhe esperado pela professora.',
            [p('helena', 'neutro', 'O tempo é curto mesmo. Justamente por isso o registro precisa ser objetivo.')],
            'O tempo é uma dificuldade real, mas usá-lo como justificativa encerra a reflexão. O registro faz parte do cuidado, é um documento legal e merece investimento de aprendizagem.',
          ),
          op(
            'inadequada',
            'Comento que outros colegas escrevem as anotações do mesmo jeito e não receberam essa crítica.',
            [p('helena', 'preocupado', 'Estou falando das suas anotações, {nome}.')],
            'Comparar-se aos colegas desvia o foco do próprio desenvolvimento e dificulta a aprendizagem. O retorno é uma oportunidade individual de crescimento.',
          ),
        ],
      },
      {
        id: 'm18e2',
        cena: 'posto',
        situacao: [
          n('No semestre seguinte, você começa um novo estágio. No primeiro dia, o Enf. Marcos avisa que o hospital atualizou o protocolo de prevenção de lesão por pressão.'),
          p('marcos', 'neutro', 'Algumas coisas são diferentes do que vocês viram em aula. O protocolo novo está na intranet.'),
        ],
        desafio: 'Como você lida com a atualização?',
        opcoes: [
          op(
            'adequada',
            'Leio o protocolo novo, comparo com o que aprendi, anoto as mudanças e tiro dúvidas com o Enf. Marcos.',
            [p('marcos', 'feliz', 'Você leu o protocolo inteiro? Isso ajuda até a equipe, que ainda está se adaptando.')],
            'Aprendizagem contínua é buscar atualização de forma ativa, comparar o novo com o que já se sabe e usar fontes institucionais e científicas. Protocolos mudam com novas evidências, e a prática precisa acompanhar.',
          ),
          op(
            'parcial',
            'Pergunto aos técnicos de enfermagem o que mudou, já que eles aplicam o protocolo todos os dias e aprendo mais rápido.',
            [p('marcos', 'neutro', 'Eles podem ajudar, mas leia também o documento.')],
            'Aprender com a equipe é valioso, mas relatos podem ser incompletos. A leitura do protocolo oficial garante a informação correta.',
          ),
          op(
            'pouco',
            'Sigo o que aprendi em aula, que é recente e foi baseado em referências científicas bem fundamentadas.',
            [p('marcos', 'preocupado', 'Essa conduta mudou no protocolo, {nome}.')],
            'O conhecimento da graduação é a base, mas se desatualiza. Manter práticas antigas por comodidade pode contrariar evidências mais recentes e as normas da instituição.',
          ),
          op(
            'inadequada',
            'Deixo para ler os protocolos com calma depois da formatura, quando eu tiver mais tempo para estudar.',
            [n('Na semana seguinte, você realiza uma conduta que não é mais recomendada e recebe uma correção.')],
            'Adiar a atualização é incompatível com a prática segura. A aprendizagem contínua começa na graduação e acompanha toda a vida profissional.',
          ),
        ],
      },
    ],
    justificativa:
      'Aprendizagem contínua envolve receber retornos com abertura, transformá-los em metas concretas, buscar fontes confiáveis e acompanhar atualizações de protocolos e evidências. É uma competência que sustenta a qualidade e a segurança do cuidado ao longo da carreira.',
    paraRefletir: 'Qual foi o último retorno que você recebeu sobre o seu desempenho? Que meta concreta ele poderia gerar?',
  },
];
