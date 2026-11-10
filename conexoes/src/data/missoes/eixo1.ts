import type { Missao } from '../../types';
import { n, op, p } from './helpers';

// EIXO 1: Comunicação e relações interpessoais

export const EIXO1: Missao[] = [
  {
    id: 'm01',
    eixo: 'e1',
    numero: 1,
    habilidade: 'Comunicação',
    titulo: 'O caderno do Seu Joaquim',
    objetivo: 'Adaptar a orientação ao nível de compreensão do usuário e confirmar o entendimento antes de encerrar.',
    contexto: 'Estágio na Unidade Básica de Saúde, sob supervisão da Enf. Tânia.',
    situacaoProblema:
      'Seu Joaquim recebeu o diagnóstico de diabetes, tem dificuldade de leitura e saiu da consulta sem entender como registrar a glicemia em casa.',
    comportamentos: ['Adapta a linguagem ao interlocutor', 'Usa exemplos concretos', 'Confirma a compreensão pedindo demonstração'],
    local: 'UBS Jardim das Flores · terça, 9h',
    cena: 'ubs',
    personagens: ['joaquim', 'tania'],
    medidor: 'Compreensão do usuário',
    etapas: [
      {
        id: 'm01e1',
        situacao: [
          n('A Enf. Tânia pediu que você reforce com Seu Joaquim as orientações sobre o registro da glicemia no caderno. Ela acompanha a conversa da mesa ao lado.'),
          p('joaquim', 'preocupado', 'Olha, {nome}, o médico falou um monte de coisa. Hiperglicemia, jejum, pós-prandial... Eu balancei a cabeça, mas não entendi foi nada.'),
          p('tania', 'neutro', 'Ele estudou pouco e tem dificuldade para ler. Fique à vontade para conduzir, eu estou aqui.'),
        ],
        desafio: 'Como você inicia a orientação?',
        opcoes: [
          op(
            'adequada',
            'Pergunto como ele mede hoje e explico com palavras do dia a dia, mostrando no próprio caderno onde anotar.',
            [p('joaquim', 'aliviado', 'Ah, então "em jejum" é antes do café? Assim fica fácil. Eu anoto aqui, nessa coluna?')],
            'Partir do que a pessoa já sabe e usar linguagem simples e objetos concretos adapta a mensagem ao letramento em saúde do usuário. Comunicação efetiva se mede pelo que o outro compreende, e não pela quantidade de informação dita.',
          ),
          op(
            'parcial',
            'Explico com calma cada termo técnico que o médico usou, para que ele aprenda o vocabulário certo e não se confunda nas consultas.',
            [p('joaquim', 'preocupado', 'Tá... pós-prandial é depois do almoço. E glicemia capilar é a do dedo? É muita palavra, viu.')],
            'Ter calma ajuda, mas o foco ficou no vocabulário técnico e não no que ele precisa fazer em casa. Para quem tem pouca escolaridade, priorizar poucas ações práticas é mais efetivo do que ensinar termos.',
          ),
          op(
            'pouco',
            'Entrego um folheto ilustrado sobre diabetes e sugiro que ele leia com a família em casa, com mais tempo e tranquilidade.',
            [p('joaquim', 'tenso', 'Folheto... Minha neta lê pra mim quando ela vem, mas ela só vem no domingo.')],
            'Materiais escritos podem complementar, mas não substituem a conversa, principalmente quando a pessoa tem dificuldade de leitura. Entregar o folheto sem checar se ele consegue usá-lo transfere a orientação para outra pessoa.',
          ),
          op(
            'inadequada',
            'Digo que ele não precisa se preocupar com os nomes difíceis e que basta seguir o que o médico mandou.',
            [p('joaquim', 'triste', 'Mas é isso que eu não sei: o que ele mandou...')],
            'A frase tranquiliza por um instante, mas encerra a comunicação justamente onde está a dúvida. O usuário sai sem saber o que fazer, o que aumenta o risco de erro no autocuidado.',
          ),
        ],
      },
      {
        id: 'm01e2',
        situacao: [
          n('Alguns minutos depois, Seu Joaquim olha para o relógio. O ônibus dele passa em 15 minutos.'),
          p('joaquim', 'neutro', 'Entendi tudo, pode deixar. Agora eu preciso ir.'),
        ],
        desafio: 'Como você confirma se a orientação foi compreendida?',
        opcoes: [
          op(
            'adequada',
            'Peço que ele me mostre no caderno como vai anotar a medida de amanhã e o que fará se o número vier alto.',
            [
              p('joaquim', 'feliz', 'Amanhã, antes do café, eu furo o dedo e escrevo aqui. Se der muito alto, eu venho no posto ou ligo. Isso?'),
              p('tania', 'feliz', 'Isso mesmo. Bom trabalho, vocês dois.'),
            ],
            'Pedir que a pessoa explique ou demonstre com as próprias palavras (técnica de ensino de retorno, ou teach-back) é a forma mais confiável de verificar a compreensão. Perguntas de sim ou não costumam gerar respostas automáticas.',
          ),
          op(
            'parcial',
            'Pergunto se ficou alguma dúvida e, como ele diz que não, encerro para que ele não perca o ônibus.',
            [p('joaquim', 'neutro', 'Não, não. Tá tudo certo.'), n('No caminho, ele percebe que não lembra em qual coluna anotar.')],
            'A pergunta é educada, mas permite uma resposta automática. Muitas pessoas dizem que não têm dúvidas por pressa ou vergonha. Um pedido de demonstração revelaria o que ficou pouco claro.',
          ),
          op(
            'pouco',
            'Repito a explicação inteira mais uma vez, de forma rápida, para garantir que nenhuma informação importante ficou de fora.',
            [p('joaquim', 'tenso', 'Tá bom, tá bom... Eu vou perder o ônibus.')],
            'Repetir não confirma a compreensão e, com pressa, a mensagem chega ainda menos. A verificação precisa vir do usuário, e não de mais fala de quem orienta.',
          ),
          op(
            'inadequada',
            'Encerro e registro no prontuário que o usuário foi orientado e compreendeu, para dar continuidade ao acompanhamento.',
            [p('tania', 'preocupado', '{nome}, como você verificou que ele compreendeu? O registro precisa refletir o que aconteceu de fato.')],
            'Registrar uma compreensão que não foi verificada torna o registro impreciso, e o registro orienta toda a equipe. A conduta não confirma o entendimento e ainda compromete a fidedignidade da anotação.',
          ),
        ],
      },
    ],
    justificativa:
      'A comunicação em saúde só cumpre seu papel quando a pessoa consegue usar a informação no dia a dia. Adaptar a linguagem ao letramento em saúde e confirmar a compreensão com a técnica de ensino de retorno são comportamentos observáveis que reduzem erros no autocuidado.',
    paraRefletir: 'Pense em uma orientação que você já deu ou recebeu. Sem perguntar "entendeu?", como você saberia que a mensagem foi compreendida?',
  },

  {
    id: 'm02',
    eixo: 'e1',
    numero: 2,
    habilidade: 'Escuta ativa',
    titulo: 'A campainha do leito 4',
    objetivo: 'Demonstrar disponibilidade, atenção e compreensão diante da fala de uma paciente, mesmo em uma rotina com muitas tarefas.',
    contexto: 'Estágio supervisionado na clínica cirúrgica de um hospital geral.',
    situacaoProblema:
      'Dona Cida chama a equipe com frequência e já recebeu o rótulo de "poliqueixosa". Ela será operada amanhã e quer conversar.',
    comportamentos: ['Mostra disponibilidade com postura e olhar', 'Parafraseia o que ouviu', 'Faz perguntas abertas e encaminha as demandas'],
    local: 'Clínica cirúrgica · quarta, 16h',
    cena: 'enfermaria',
    personagens: ['cida', 'edson'],
    medidor: 'Confiança da paciente',
    etapas: [
      {
        id: 'm02e1',
        situacao: [
          n('Você tem três tarefas pendentes quando a campainha do leito 4 toca pela terceira vez.'),
          p('edson', 'tenso', 'É a Dona Cida de novo. Ela chama toda hora, é poliqueixosa. Vai lá rapidinho e volta.'),
          p('cida', 'preocupado', 'Ah, que bom que veio. Senta aqui um pouquinho? É que amanhã cedo é a cirurgia, e eu fico pensando...'),
        ],
        desafio: 'Ela começa a falar. O que você faz?',
        opcoes: [
          op(
            'adequada',
            'Aviso que tenho alguns minutos agora, sento na altura dela e a deixo falar sem interromper.',
            [p('cida', 'aliviado', 'Obrigada por sentar. Você é a primeira pessoa que senta comigo hoje.')],
            'Delimitar o tempo com honestidade e mostrar atenção com o corpo (sentar, olhar nos olhos) cria condições para a escuta, mesmo em uma rotina corrida. Você também não deixou que o rótulo dado pela equipe definisse a sua conduta.',
          ),
          op(
            'parcial',
            'Escuto em pé, perto da porta, enquanto confiro a prescrição no tablet, para não atrasar as outras tarefas da tarde.',
            [p('cida', 'preocupado', 'Ah... vejo que tem muita coisa pra fazer. Não é nada, não. Pode ir.')],
            'Você estava presente, mas a atenção dividida e a postura de saída comunicaram que não havia espaço para ela. Escuta ativa envolve postura, olhar e foco, e não só ouvir as palavras.',
          ),
          op(
            'pouco',
            'Digo que a cirurgia é simples e que vai dar tudo certo, para que ela consiga descansar melhor antes de amanhã.',
            [p('cida', 'triste', 'É... todo mundo fala isso.')],
            'A tranquilização precoce parece acolhedora, mas interrompe a fala e desconsidera o medo da pessoa. Além disso, garantir que "vai dar tudo certo" é uma promessa que o estudante não pode fazer.',
          ),
          op(
            'inadequada',
            'Explico que tenho outras prioridades agora e que volto para conversar com calma assim que terminar as tarefas.',
            [n('Você só consegue voltar 40 minutos depois. Dona Cida está chorando baixinho.')],
            'Adiar sem combinar um horário e sem perguntar o que ela precisava ignora a possibilidade de uma demanda importante. Chamados repetidos costumam sinalizar uma necessidade não atendida, e não apenas "queixa".',
          ),
        ],
      },
      {
        id: 'm02e2',
        situacao: [
          p('cida', 'triste', 'É que ninguém me explicou como vai ser amanhã. E o meu marido morreu depois de uma cirurgia, sabe? Eu não paro de pensar nisso.'),
        ],
        desafio: 'Como você responde ao que ela contou?',
        opcoes: [
          op(
            'adequada',
            'Devolvo o que entendi do medo dela, pergunto o que ela gostaria de saber e levo as dúvidas ao enfermeiro responsável.',
            [
              p('cida', 'aliviado', 'Isso, é isso mesmo. Queria saber se vou ficar acordada e quando vou ver minha filha.'),
              n('Você registra as dúvidas e comunica ao enfermeiro, que passa no leito antes do jantar.'),
            ],
            'Parafrasear mostra que você ouviu e permite que ela confirme ou corrija. As perguntas abertas revelam as necessidades reais, e levar as dúvidas a quem pode respondê-las respeita o limite de atuação do estudante.',
          ),
          op(
            'parcial',
            'Explico, com o que aprendi em aula, como costuma ser o pré-operatório desse tipo de cirurgia, para ela saber o que esperar.',
            [p('cida', 'preocupado', 'Hum... mas e no meu caso? Eu vou ficar acordada?')],
            'A intenção de informar é boa, mas a resposta partiu do seu conhecimento e não da dúvida dela. Informações gerais podem não valer para o caso dela; o ideal é identificar as perguntas e levá-las ao profissional responsável.',
          ),
          op(
            'pouco',
            'Conto que outra paciente fez a mesma cirurgia na semana passada e já está em casa, para ela ver que costuma dar certo.',
            [p('cida', 'neutro', 'Que bom pra ela...')],
            'Comparar experiências desloca o foco para outra história e não responde ao medo dela. Além disso, compartilhar informações de outra paciente fere o sigilo.',
          ),
          op(
            'inadequada',
            'Mudo de assunto e pergunto sobre os netos, para tirar o foco do medo e animá-la um pouco.',
            [p('cida', 'triste', 'Os netos estão bem...'), n('Ela não volta a falar da cirurgia, mas passa a noite acordada.')],
            'Mudar de assunto alivia o desconforto de quem escuta, mas silencia a preocupação de quem fala. O medo continua presente, agora sem cuidado.',
          ),
        ],
      },
    ],
    justificativa:
      'Escuta ativa é um conjunto de comportamentos observáveis: disponibilidade, postura atenta, perguntas abertas, paráfrase e encaminhamento do que foi dito. Chamados frequentes podem sinalizar necessidades não atendidas, e rótulos como "poliqueixosa" dificultam essa percepção.',
    paraRefletir: 'Quando alguém fala com você e você está com pressa, quais sinais do seu corpo mostram que você não está ouvindo?',
  },

  {
    id: 'm03',
    eixo: 'e1',
    numero: 3,
    habilidade: 'Empatia',
    titulo: 'Uma noite sem respostas',
    objetivo: 'Reconhecer e validar a experiência emocional de uma familiar e agir para atender sua necessidade, dentro do papel do estudante.',
    contexto: 'Estágio na unidade de internação pediátrica.',
    situacaoProblema:
      'Renata, mãe de Davi (4 anos), passou a noite sem notícias sobre um exame do filho e aborda você, irritada, logo no início do turno.',
    comportamentos: ['Nomeia a emoção e a situação do outro', 'Evita julgar a forma como o outro se expressa', 'Age para atender a necessidade, respeitando o seu papel'],
    local: 'Corredor da pediatria · quinta, 7h30',
    cena: 'corredor',
    personagens: ['renata', 'marcos'],
    medidor: 'Vínculo com a família',
    etapas: [
      {
        id: 'm03e1',
        situacao: [
          n('Renata, mãe de Davi, aborda você assim que você chega ao setor.'),
          p('renata', 'tenso', 'Você é da enfermagem? Estou aqui desde ontem esperando o resultado do exame do meu filho e ninguém me fala nada! Ninguém se importa!'),
        ],
        desafio: 'Qual é a sua primeira resposta?',
        opcoes: [
          op(
            'adequada',
            'Reconheço em voz alta que ela passou a noite preocupada e sem resposta, e pergunto como ela e o Davi estão agora.',
            [p('renata', 'triste', 'Cansa é pouco... Ele chorou a noite inteira e eu não dormi nada.')],
            'Nomear o sentimento e a situação, sem julgar o tom da mãe, comunica compreensão. Empatia é reconhecer a perspectiva do outro e demonstrar isso em palavras e atitudes, sem precisar concordar com tudo.',
          ),
          op(
            'parcial',
            'Peço desculpas em nome da equipe e explico que o laboratório está sobrecarregado, para ela entender o motivo da demora.',
            [p('renata', 'tenso', 'Sobrecarregado... E eu? Eu também estou sobrecarregada.')],
            'Pedir desculpas pode ajudar, mas a explicação sobre o laboratório coloca a instituição no centro antes de reconhecer a experiência dela. Primeiro acolher a emoção, depois explicar.',
          ),
          op(
            'pouco',
            'Explico que não estou responsável pelo Davi hoje e que o enfermeiro do setor é quem pode dar as informações a ela.',
            [p('renata', 'tenso', 'É sempre assim. Todo mundo empurra pra outra pessoa.')],
            'Indicar o responsável é correto, mas fazer isso sem nenhum reconhecimento da situação soa como "não é comigo". É possível encaminhar e, ao mesmo tempo, mostrar que você se importa.',
          ),
          op(
            'inadequada',
            'Peço que ela fale mais baixo, porque há outras crianças dormindo no setor, e depois ouço o que ela tem a dizer.',
            [p('renata', 'tenso', 'Ah, agora o problema sou eu?')],
            'A preocupação com o ambiente é legítima, mas, como primeira resposta, invalida o sofrimento dela e tende a aumentar a tensão. Depois de acolher, você pode convidá-la para conversar em um lugar mais reservado.',
          ),
        ],
      },
      {
        id: 'm03e2',
        situacao: [p('renata', 'preocupado', 'Me fala a verdade. Você acha que é grave? Você deve saber alguma coisa.')],
        desafio: 'Ela pede a sua opinião sobre o estado de saúde do filho. O que você faz?',
        opcoes: [
          op(
            'adequada',
            'Explico que essa avaliação não cabe a mim e vou com ela até o Enf. Marcos, ficando ao lado dela na conversa.',
            [
              p('marcos', 'neutro', 'Renata, vamos sentar ali. Vou ver o resultado agora com a médica e já te explico.'),
              p('renata', 'aliviado', 'Obrigada por não me deixar sozinha nisso.'),
            ],
            'Você reconheceu a necessidade dela e garantiu que a informação viesse de quem tem competência para dá-la, sem abandoná-la no caminho. Empatia e limite de atuação caminham juntos.',
          ),
          op(
            'parcial',
            'Digo que não posso falar sobre o diagnóstico e que ela precisa aguardar a equipe médica, que logo deve passar no quarto.',
            [p('renata', 'triste', 'Aguardar. Tá.')],
            'A resposta respeita o limite do estudante, mas deixa a mãe sozinha com a angústia. Faltou uma ação concreta, como acionar o enfermeiro ou combinar quando ela terá retorno.',
          ),
          op(
            'pouco',
            'Digo que, pelo que observei no plantão, ele parece bem, e que provavelmente não é nada grave.',
            [n('Mais tarde, o exame mostra que Davi precisará de mais alguns dias de internação. Renata fica confusa com as informações diferentes.')],
            'A intenção de acalmar é compreensível, mas opinar sobre a gravidade sem avaliação e sem competência para isso cria expectativas falsas e abala a confiança na equipe.',
          ),
          op(
            'inadequada',
            'Procuro o resultado no sistema e leio para ela o que está escrito no laudo, para que ela não fique sem informação.',
            [p('marcos', 'tenso', '{nome}, pare. Resultados são discutidos com a família pelo profissional responsável, com contexto.')],
            'Ler um laudo sem interpretação clínica pode assustar ou confundir a família, e comunicar resultados não é atribuição do estudante. Ajudar de verdade é garantir que ela receba a informação de quem pode explicá-la.',
          ),
        ],
      },
    ],
    justificativa:
      'Empatia, na prática profissional, se expressa em comportamentos: reconhecer verbalmente a emoção, evitar julgamentos sobre o tom do outro e agir para atender a necessidade identificada, dentro dos limites de atuação.',
    paraRefletir: 'Qual é a diferença entre dizer "eu entendo" e mostrar que entendeu? Que frase você usaria no lugar?',
  },

  {
    id: 'm04',
    eixo: 'e1',
    numero: 4,
    habilidade: 'Acolhimento',
    titulo: 'Alguém para conversar',
    objetivo: 'Receber uma demanda espontânea com escuta qualificada, privacidade e informação honesta sobre o sigilo.',
    contexto: 'Estágio na Unidade Básica de Saúde, apoiando o acolhimento.',
    situacaoProblema:
      'Pedro, de 16 anos, chega sozinho à UBS dizendo que precisa "falar com alguém", mas evita contar o motivo na frente de outras pessoas.',
    comportamentos: ['Apresenta-se e valoriza a procura', 'Garante privacidade', 'Explica o sigilo e seus limites com honestidade'],
    local: 'UBS Jardim das Flores · sexta, 10h',
    cena: 'ubs',
    personagens: ['pedro', 'tania'],
    medidor: 'Confiança do adolescente',
    etapas: [
      {
        id: 'm04e1',
        situacao: [
          n('A recepção está cheia. Um adolescente se aproxima do balcão onde você está apoiando o acolhimento.'),
          p('pedro', 'tenso', 'Oi... eu queria falar com alguém. Não é pra marcar consulta, não. É... uma coisa.'),
          n('Ele olha para os lados. Há várias pessoas perto do balcão.'),
        ],
        desafio: 'Como você o recebe?',
        opcoes: [
          op(
            'adequada',
            'Me apresento, digo que ele fez bem em vir e o convido para uma sala reservada, avisando a Enf. Tânia.',
            [p('pedro', 'aliviado', 'Pode ser lá dentro, sim. Valeu.')],
            'Acolher começa na recepção: apresentar-se, valorizar a procura e garantir privacidade. Na frente de outras pessoas, um adolescente dificilmente falaria do que o trouxe.',
          ),
          op(
            'parcial',
            'Peço que ele me conte baixinho ali mesmo, no canto do balcão, para eu entender a demanda e ver para onde encaminhar.',
            [p('pedro', 'tenso', 'Aqui fica difícil...'), n('Você percebe o desconforto e o leva para uma sala. Ele entra, mas fica mais fechado.')],
            'Querer entender a demanda é importante, mas a falta de privacidade inibe. Corrigir a rota foi bom; o ideal é oferecer o espaço reservado desde o início.',
          ),
          op(
            'pouco',
            'Pergunto se ele está com algum responsável, já que é menor de idade, antes de seguir com o atendimento.',
            [p('pedro', 'tenso', 'Precisa? Minha mãe tá trabalhando...'), n('Ele quase vai embora. A Enf. Tânia se aproxima e o convida para uma sala.')],
            'Adolescentes têm direito a atendimento na unidade de saúde, inclusive desacompanhados, com respeito à privacidade. Começar pela exigência de um responsável pode afastá-lo justamente quando ele buscou ajuda.',
          ),
          op(
            'inadequada',
            'Peço que ele pegue uma senha e aguarde ser chamado, para respeitar a ordem de quem já estava esperando.',
            [n('Pedro pega a senha, senta por alguns minutos e sai antes de ser chamado. A Enf. Tânia o alcança na porta e o convida para conversar.')],
            'Tratar uma demanda espontânea e sensível como rotina administrativa ignora os sinais de que ele precisava de escuta. Acolhimento é postura e prática de escuta qualificada, e não apenas organização de fila.',
          ),
        ],
      },
      {
        id: 'm04e2',
        situacao: [
          n('Na sala, com a Enf. Tânia presente, Pedro começa a falar e para no meio.'),
          p('pedro', 'preocupado', 'Se eu contar, vocês vão falar pra minha mãe?'),
        ],
        desafio: 'Como você responde à pergunta sobre sigilo?',
        opcoes: [
          op(
            'adequada',
            'Explico que a equipe mantém sigilo e que só envolveria a família diante de risco à vida dele, conversando com ele antes.',
            [
              p('pedro', 'aliviado', 'Tá. Então... eu ando muito ansioso, não tô conseguindo dormir, e não sei com quem falar.'),
              p('tania', 'feliz', 'Obrigada por confiar na gente, Pedro. Vamos pensar juntos no que fazer.'),
            ],
            'Ser transparente sobre o sigilo e seus limites constrói confiança real. Promessas absolutas ou a ameaça de contar aos pais quebram o vínculo; a verdade dita com cuidado o fortalece.',
          ),
          op(
            'parcial',
            'Digo que quem pode responder isso com segurança é a Enf. Tânia e deixo que ela conduza a conversa a partir daí.',
            [p('tania', 'neutro', 'Posso explicar, sim, Pedro.'), n('Pedro se volta para a enfermeira e não olha mais para você.')],
            'Reconhecer a experiência da enfermeira é adequado, mas você poderia ter dado uma primeira resposta acolhedora, já que ele dirigiu a pergunta a você. Acolher também é sustentar a conversa.',
          ),
          op(
            'pouco',
            'Prometo que nada do que ele disser vai sair desta sala, aconteça o que acontecer, para que ele se sinta seguro.',
            [p('pedro', 'aliviado', 'Promete mesmo?'), p('tania', 'preocupado', 'Pedro, deixa eu complementar o que foi dito...')],
            'A promessa de sigilo absoluto não pode ser cumprida em situações de risco, e quebrá-la depois prejudicaria a confiança dele no serviço. O sigilo é um direito, mas tem limites que precisam ser explicados com honestidade.',
          ),
          op(
            'inadequada',
            'Explico que, como ele tem 16 anos, a família precisa ser informada de qualquer coisa importante que ele contar.',
            [p('pedro', 'tenso', 'Então esquece. Não é nada.')],
            'Essa resposta desconsidera o direito do adolescente à privacidade e ao sigilo e provavelmente faz com que ele não volte ao serviço. Envolver a família pode ser necessário em situações de risco, mas isso é avaliado pela equipe e conversado com ele.',
          ),
        ],
      },
    ],
    justificativa:
      'Acolhimento é uma diretriz da Política Nacional de Humanização: receber, escutar e dar uma resposta responsável à necessidade da pessoa. Com adolescentes, privacidade e sigilo, com limites explicados de forma honesta, são condições para que a procura pelo serviço aconteça e se mantenha.',
    paraRefletir: 'O que, no ambiente da sua unidade de estágio, facilita ou dificulta que uma pessoa se sinta acolhida logo na chegada?',
  },
];
