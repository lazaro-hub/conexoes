import type { Missao } from '../../types';
import { n, op, p } from './helpers';

// EIXO 3: Pensamento crítico e decisão

export const EIXO3: Missao[] = [
  {
    id: 'm10',
    eixo: 'e3',
    numero: 10,
    habilidade: 'Pensamento crítico',
    titulo: 'É da idade?',
    objetivo: 'Questionar uma explicação pronta, buscar evidências e comunicar os dados de forma organizada para a decisão da equipe.',
    contexto: 'Estágio supervisionado na clínica médica, início do turno da manhã.',
    situacaoProblema:
      'Dona Rosa, de 79 anos, amanheceu confusa. A equipe atribui a confusão "à idade", mas no dia anterior ela estava orientada e conversando normalmente.',
    comportamentos: ['Questiona pressupostos', 'Compara dados com a condição anterior', 'Organiza as evidências para comunicar'],
    local: 'Clínica médica · terça, 8h',
    cena: 'enfermaria',
    personagens: ['rosa', 'edson', 'marta', 'marcos'],
    medidor: 'Clareza do raciocínio',
    etapas: [
      {
        id: 'm10e1',
        situacao: [
          n('Na passagem de plantão, consta: "Dona Rosa, 79 anos, confusa e agitada durante a noite".'),
          p('rosa', 'preocupado', 'Ô, meu bem, que lugar é esse? Cadê minha casa? Eu preciso dar comida pras galinhas.'),
          p('edson', 'neutro', 'Ela está assim desde a madrugada. É da idade, idoso fica assim no hospital. Não esquenta.'),
          n('Ontem à tarde, quando você conversou com ela, Dona Rosa estava orientada e falante.'),
        ],
        desafio: 'Qual é a sua atitude diante dessa informação?',
        opcoes: [
          op(
            'adequada',
            'Verifico os sinais vitais, revejo os registros das últimas 24 horas e pergunto à família como ela é em casa.',
            [n('Temperatura: 38,1 °C. Nos registros, consta que ela urinou pouco e recusou água durante a noite.')],
            'Pensamento crítico é questionar explicações prontas e buscar evidências. Uma confusão que surge de repente, em quem estava orientada, é um sinal de alerta que precisa ser investigado, e não algo "da idade".',
          ),
          op(
            'parcial',
            'Anoto a mudança no meu caderno para perguntar à professora, no fim da manhã, se esse quadro é esperado em pacientes idosos.',
            [n('Ao meio-dia, a confusão de Dona Rosa está mais intensa.')],
            'Você percebeu algo diferente e buscou orientação, o que é positivo. Porém, uma mudança aguda no estado mental pede verificação e comunicação no momento, e não no fim do turno.',
          ),
          op(
            'pouco',
            'Aceito a explicação do Sr. Edson, que tem muitos anos de experiência com pacientes idosos internados.',
            [p('edson', 'neutro', 'Isso. Daqui a pouco ela acalma.')],
            'A experiência dos colegas é valiosa, mas não substitui a análise dos dados do paciente. Aceitar uma explicação sem checá-la é justamente o que o pensamento crítico ajuda a evitar.',
          ),
          op(
            'inadequada',
            'Peço ao Sr. Edson que contenha Dona Rosa no leito, para evitar uma queda enquanto ela estiver agitada.',
            [p('edson', 'tenso', 'Contenção não é assim, {nome}. Precisa de avaliação e indicação da equipe.')],
            'A preocupação com quedas é válida, mas a contenção é uma medida excepcional, que depende de avaliação e indicação da equipe, e não trata a causa da confusão. O primeiro passo é investigar.',
          ),
        ],
      },
      {
        id: 'm10e2',
        situacao: [
          p('marta', 'preocupado', 'Minha mãe é lúcida! Ela mora sozinha, faz tudo. Nunca vi ela assim.'),
          n('Você verifica os dados: mudança súbita em relação a ontem, temperatura de 38,1 °C, pouca urina e pouca ingestão de água.'),
        ],
        desafio: 'O que você faz com essas informações?',
        opcoes: [
          op(
            'adequada',
            'Comunico já ao Enf. Marcos, de forma organizada: situação, histórico, dados levantados e o que me preocupa.',
            [p('marcos', 'preocupado', 'Bem observado. Mudança aguda com febre precisa de avaliação médica agora. Vou acionar a equipe.')],
            'Organizar as informações (por exemplo, com a estrutura SBAR: situação, breve histórico, avaliação e recomendação) torna a comunicação clara e rápida. Você analisou os dados e levou a decisão a quem tem competência para tomá-la.',
          ),
          op(
            'parcial',
            'Digo ao Enf. Marcos que Dona Rosa parece pior do que ontem e pergunto a ele o que acha da situação.',
            [p('marcos', 'neutro', 'Pior como? Você tem algum dado?')],
            'Comunicar foi o caminho certo, mas, sem os dados organizados, a mensagem perde força e exige novas perguntas. Pensamento crítico também é saber apresentar as evidências.',
          ),
          op(
            'pouco',
            'Por conta própria, ofereço água e o antitérmico prescrito "se necessário", já que a febre pode estar causando a confusão.',
            [p('marcos', 'tenso', '{nome}, você administrou sem falar comigo? Estudante só administra medicamento sob supervisão.')],
            'Mesmo com prescrição, o estudante administra medicamentos sob supervisão. E tratar a febre não substitui a avaliação da causa da confusão, que precisa ser comunicada.',
          ),
          op(
            'inadequada',
            'Explico à filha que deve ser uma infecção urinária e que, com o tratamento, a confusão logo vai passar.',
            [p('marta', 'tenso', 'Infecção? Ninguém tinha me falado isso!')],
            'Levantar hipóteses faz parte do raciocínio, mas comunicá-las à família como diagnóstico ultrapassa o papel do estudante e pode gerar informações incorretas.',
          ),
        ],
      },
    ],
    justificativa:
      'Pensamento crítico envolve questionar pressupostos ("é da idade"), comparar dados com a condição anterior, buscar evidências e organizar as informações para a decisão. Uma alteração aguda do estado mental em pessoas idosas pode indicar uma condição clínica que exige avaliação rápida.',
    paraRefletir: 'Que "verdades da rotina" do seu campo de estágio você já ouviu e nunca checou? Como poderia verificá-las?',
  },

  {
    id: 'm11',
    eixo: 'e3',
    numero: 11,
    habilidade: 'Reflexão',
    titulo: 'Leito 8, leito 9',
    objetivo: 'Analisar um quase erro com honestidade, identificar causas e transformar a experiência em um plano de ação.',
    contexto: 'Estágio na clínica médica, preparo e administração de medicamentos sob supervisão.',
    situacaoProblema:
      'Você quase administra um medicamento no paciente errado, que tinha nome parecido. O enfermeiro intervém a tempo e pede para conversar.',
    comportamentos: ['Descreve o ocorrido com honestidade', 'Analisa causas pessoais e do processo', 'Define o que fará diferente'],
    local: 'Clínica médica · quarta, 11h',
    cena: 'enfermaria',
    personagens: ['marcos', 'helena'],
    medidor: 'Aprendizado com a experiência',
    etapas: [
      {
        id: 'm11e1',
        situacao: [
          n('Sob supervisão do Enf. Marcos, você prepara a medicação do Sr. José Carlos, do leito 8.'),
          n('No quarto, você se aproxima do leito 9, do Sr. José Cláudio. Antes que você comece, o Enf. Marcos intervém.'),
          p('marcos', 'tenso', '{nome}, espera. Confere a pulseira.'),
          n('Era o paciente errado. Nada foi administrado.'),
          p('marcos', 'neutro', 'Vamos conversar ali fora. O que aconteceu?'),
        ],
        desafio: 'Como você responde?',
        opcoes: [
          op(
            'adequada',
            'Descrevo o que fiz e onde a checagem falhou: não conferi a pulseira e me guiei pelo nome parecido e pela pressa.',
            [p('marcos', 'aliviado', 'Obrigado pela clareza. Assim a gente entende o processo, e não só o erro.')],
            'Descrever o ocorrido com honestidade e identificar o ponto exato da falha é o início da reflexão sobre a prática. Um quase erro é uma oportunidade de aprendizagem para você e para a equipe.',
          ),
          op(
            'parcial',
            'Peço muitas desculpas ao Enf. Marcos e garanto que vou ter mais cuidado para que isso nunca mais aconteça.',
            [p('marcos', 'neutro', 'Entendo. Mas o que exatamente fez isso acontecer?')],
            'Reconhecer é importante, mas promessas não explicam a causa. Sem analisar o que levou à falha, a chance de repeti-la continua a mesma.',
          ),
          op(
            'pouco',
            'Explico que os nomes são muito parecidos e que os leitos deveriam estar mais bem identificados pela instituição.',
            [p('marcos', 'neutro', 'Isso também é verdade. E na sua parte do processo?')],
            'Fatores do ambiente contribuem para erros e precisam ser considerados, mas a reflexão também inclui a própria conduta. Olhar apenas para fora impede o aprendizado pessoal.',
          ),
          op(
            'inadequada',
            'Lembro que nenhum medicamento chegou a ser administrado, então, na prática, não houve erro com o paciente.',
            [p('marcos', 'tenso', 'Não chegou ao paciente porque alguém interrompeu. Isso é um quase erro e precisa ser analisado.')],
            'Incidentes que não chegam ao paciente (quase erros) revelam falhas no processo e são valiosos para a segurança. Minimizar o ocorrido impede que a lição seja aprendida.',
          ),
        ],
      },
      {
        id: 'm11e2',
        cena: 'sala-aula',
        situacao: [
          n('À noite, você escreve o diário reflexivo do estágio, que será lido pela Profa. Helena.'),
        ],
        desafio: 'Como você escreve sobre o episódio no diário reflexivo?',
        opcoes: [
          op(
            'adequada',
            'Descrevo o fato, o que senti, por que a checagem falhou e o que farei diferente, relacionando ao protocolo de identificação.',
            [n('Na semana seguinte, a Profa. Helena usa o seu relato, sem identificar ninguém, em uma discussão com a turma sobre segurança do paciente.')],
            'Uma boa reflexão percorre descrição, sentimentos, análise, conclusão e plano de ação, como propõem modelos de ciclo reflexivo (por exemplo, o de Gibbs). Relacionar a experiência a referências transforma o episódio em aprendizagem.',
          ),
          op(
            'parcial',
            'Descrevo em detalhes tudo o que aconteceu, em ordem cronológica, para que a professora entenda exatamente a situação.',
            [p('helena', 'neutro', 'Bom relato. E o que você aprendeu com isso?')],
            'A descrição é o primeiro passo, mas, sozinha, não é reflexão. Faltou analisar causas, sentimentos e o que muda na sua prática.',
          ),
          op(
            'pouco',
            'Escrevo com sinceridade que o dia foi horrível e que talvez eu não tenha jeito para essa profissão.',
            [n('A Profa. Helena marca uma conversa com você para a semana seguinte.')],
            'Registrar sentimentos faz parte da reflexão, mas generalizar um episódio como incapacidade pessoal não ajuda a aprender. Erros e quase erros acontecem e precisam ser analisados com equilíbrio.',
          ),
          op(
            'inadequada',
            'Prefiro não registrar o episódio no diário, porque ele já foi resolvido com o enfermeiro e poderia prejudicar minha avaliação.',
            [p('helena', 'preocupado', 'O Enf. Marcos me contou sobre o quase erro. Por que ele não aparece no seu diário?')],
            'Omitir experiências difíceis esvazia a função do diário reflexivo e contraria a cultura de segurança, que depende da notificação e da discussão de incidentes.',
          ),
        ],
      },
    ],
    justificativa:
      'Refletir sobre a prática é examinar a própria experiência para compreendê-la e transformá-la. Na segurança do paciente, refletir sobre quase erros, sem culpabilização e sem minimização, fortalece práticas como a conferência de pelo menos dois identificadores, prevista no Protocolo de Identificação do Paciente.',
    paraRefletir: 'Que situação do seu estágio você ainda não analisou com calma? O que a sua descrição, sozinha, não explica?',
  },

  {
    id: 'm12',
    eixo: 'e3',
    numero: 12,
    habilidade: 'Resolução de problemas',
    titulo: 'O grupo que esvaziou',
    objetivo: 'Definir o problema, investigar causas com dados, propor alternativas e avaliar os resultados antes de decidir.',
    contexto: 'Estágio na Unidade Básica de Saúde, apoio ao grupo de pessoas com hipertensão.',
    situacaoProblema:
      'O grupo de hipertensos da UBS, que reunia 30 pessoas, passou a receber cinco. A enfermeira pede ajuda aos estudantes para entender o que aconteceu.',
    comportamentos: ['Investiga causas antes de propor soluções', 'Gera alternativas a partir dos dados', 'Testa e avalia os resultados'],
    local: 'UBS Jardim das Flores · quinta, 13h',
    cena: 'ubs',
    personagens: ['tania', 'bia', 'joaquim'],
    medidor: 'Efetividade da solução',
    etapas: [
      {
        id: 'm12e1',
        situacao: [
          n('O grupo de hipertensos, que acontece às quintas às 14h, tinha 30 participantes e agora recebe cinco.'),
          p('tania', 'preocupado', 'Quero que vocês me ajudem a entender por que o grupo esvaziou e o que podemos fazer.'),
          p('bia', 'neutro', 'Acho que é desinteresse. Vamos fazer um cartaz mais chamativo!'),
        ],
        desafio: 'Por onde você começa?',
        opcoes: [
          op(
            'adequada',
            'Proponho ouvir os participantes e quem deixou de ir, ver as listas de presença e falar com os agentes comunitários.',
            [n('Em uma semana, vocês ouvem 18 usuários. Motivos mais citados: horário de muito calor, coincidência com o trabalho e encontros só com palestras.')],
            'Resolver problemas começa por defini-los bem e investigar as causas com dados. Soluções escolhidas antes do diagnóstico costumam atacar o problema errado.',
          ),
          op(
            'parcial',
            'Sugiro fazer o cartaz e, ao mesmo tempo, perguntar a todos que vierem ao grupo o que acham dos encontros e do horário.',
            [n('O cartaz fica bonito, mas só os cinco participantes de sempre respondem à pergunta.')],
            'Coletar opiniões é positivo, mas ouvir apenas quem ainda frequenta deixa de fora justamente quem deixou de ir, que tem a informação mais importante.',
          ),
          op(
            'pouco',
            'Concordo com a ideia do cartaz, porque é uma solução rápida, barata e que pode ser feita ainda nesta semana.',
            [n('Duas semanas depois, o grupo continua com cinco participantes.')],
            'A solução é rápida, mas parte de um pressuposto não verificado (o "desinteresse"). Sem conhecer as causas, o esforço pode não ter efeito.',
          ),
          op(
            'inadequada',
            'Sugiro encerrar o grupo e usar o horário para consultas individuais, já que a adesão está muito baixa.',
            [p('tania', 'triste', 'Encerrar? Esse grupo era importante para o acompanhamento deles.')],
            'Abandonar uma estratégia sem investigar o problema descarta um espaço de cuidado que funcionava. Baixa adesão é um problema a ser analisado, e não uma conclusão.',
          ),
        ],
      },
      {
        id: 'm12e2',
        cena: 'reuniao',
        situacao: [
          n('Com os dados em mãos, a equipe se reúne. Os principais motivos foram horário, trabalho e formato de palestra.'),
          p('tania', 'neutro', 'E agora? O que vocês propõem?'),
        ],
        desafio: 'Qual proposta você leva?',
        opcoes: [
          op(
            'adequada',
            'Testar por um mês um encontro cedo e outro no fim da tarde, com atividades participativas, e avaliar a presença.',
            [n('Após um mês, a média de presença sobe para 19 participantes. A equipe decide manter o novo formato e reavaliar em três meses.')],
            'Gerar alternativas a partir das causas, testar em pequena escala e avaliar os resultados é a lógica dos ciclos de melhoria (planejar, fazer, verificar e agir). Assim, a decisão final se apoia em resultados.',
          ),
          op(
            'parcial',
            'Mudar definitivamente o horário para o início da manhã, que foi o horário mais pedido pelos usuários ouvidos.',
            [n('A presença melhora um pouco, mas quem trabalha pela manhã continua sem conseguir ir.')],
            'A proposta responde a uma das causas, mas é implantada sem teste e sem considerar todos os grupos. Avaliar o efeito permitiria ajustar a solução.',
          ),
          op(
            'pouco',
            'Manter o horário atual e convidar um palestrante conhecido na cidade para atrair mais público ao grupo.',
            [n('No dia da palestra, vêm 12 pessoas. Na semana seguinte, cinco.')],
            'A solução não corresponde às causas encontradas (horário e formato). Um atrativo pontual não resolve barreiras que se repetem toda semana.',
          ),
          op(
            'inadequada',
            'Fazer visitas aos usuários que faltaram, lembrando a importância de participar do grupo para controlar a pressão.',
            [p('joaquim', 'tenso', 'Eu trabalho até as cinco. Não é questão de querer.')],
            'Cobrar presença sem mudar as condições que impedem a participação responsabiliza os usuários por um problema do serviço e pode afastá-los ainda mais.',
          ),
        ],
      },
    ],
    justificativa:
      'Resolução de problemas é um processo: definir o problema, investigar causas com dados, gerar alternativas, testar e avaliar. Na Atenção Primária, envolver os usuários na identificação das causas aumenta a chance de soluções efetivas.',
    paraRefletir: 'Pense em um problema do seu campo de estágio. Que dado você precisaria coletar antes de propor qualquer solução?',
  },

  {
    id: 'm13',
    eixo: 'e3',
    numero: 13,
    habilidade: 'Tomada de decisão',
    titulo: 'Três chamados ao mesmo tempo',
    objetivo: 'Priorizar demandas pelo risco, delegar com clareza e tomar decisões seguras dentro dos limites de atuação do estudante.',
    contexto: 'Estágio na clínica médica, com o enfermeiro supervisor atendendo uma intercorrência em outro quarto.',
    situacaoProblema:
      'Três demandas chegam ao mesmo tempo, uma delas com sinais de instabilidade respiratória. Em seguida, você precisa decidir o que fazer até o enfermeiro chegar.',
    comportamentos: ['Prioriza pelo risco', 'Delega e comunica as demais demandas', 'Age dentro dos limites e aciona a supervisão'],
    local: 'Clínica médica · sexta, 14h',
    cena: 'enfermaria',
    personagens: ['lauro', 'edson', 'marcos'],
    medidor: 'Segurança do paciente',
    etapas: [
      {
        id: 'm13e1',
        cena: 'corredor',
        situacao: [
          n('O Enf. Marcos está em outro quarto, atendendo uma intercorrência. Três situações chegam até você ao mesmo tempo.'),
          n('Seu Lauro, do leito 5, chama: está com falta de ar repentina e agitado. Dona Cida, do leito 4, pede ajuda para ir ao banheiro. No balcão, um familiar pede os papéis da alta.'),
          p('edson', 'neutro', 'Estou terminando um banho aqui do lado. O que você precisa?'),
        ],
        desafio: 'Como você prioriza?',
        opcoes: [
          op(
            'adequada',
            'Vou até o Seu Lauro e peço ao Sr. Edson que avise o enfermeiro e ajude Dona Cida. Aviso o familiar que já atendo.',
            [p('edson', 'neutro', 'Já estou chamando o Marcos e levo a Dona Cida em seguida.'), n('Você chega ao leito 5. Seu Lauro está sentado, respirando rápido.')],
            'A falta de ar repentina é a situação de maior risco, por isso vem primeiro. Pedir ajuda e delegar as outras demandas garante que nenhuma fique abandonada.',
          ),
          op(
            'parcial',
            'Vou direto até o Seu Lauro, que parece o caso mais grave, e deixo as outras demandas para quando ele estiver estável.',
            [n('Dona Cida, cansada de esperar, tenta ir sozinha ao banheiro e precisa se apoiar na parede.')],
            'A prioridade foi correta, mas deixar as outras demandas sem encaminhamento cria novos riscos, como o de queda. Priorizar inclui delegar e comunicar.',
          ),
          op(
            'pouco',
            'Ajudo primeiro Dona Cida, que leva só dois minutos, e em seguida vou ver o Seu Lauro com calma.',
            [n('Quando você chega ao leito 5, Seu Lauro está mais agitado e suando.')],
            'Resolver primeiro o que é rápido parece eficiente, mas a ordem deve seguir o risco. Uma alteração respiratória aguda não pode esperar.',
          ),
          op(
            'inadequada',
            'Entrego os papéis da alta primeiro, porque o familiar está esperando no balcão há mais tempo que os outros.',
            [n('Enquanto você procura os papéis, a campainha do leito 5 toca sem parar.')],
            'Ordem de chegada não é critério de prioridade no cuidado. Demandas administrativas podem esperar; sinais de instabilidade clínica, não.',
          ),
        ],
      },
      {
        id: 'm13e2',
        situacao: [
          n('No leito 5, Seu Lauro respira rápido. O oxímetro marca 88%. Ele usa cateter nasal de oxigênio, com fluxo prescrito. O Enf. Marcos está a caminho.'),
          p('lauro', 'tenso', 'Não tô conseguindo puxar o ar...'),
        ],
        desafio: 'Enquanto o enfermeiro não chega, o que você faz?',
        opcoes: [
          op(
            'adequada',
            'Fico com ele, elevo a cabeceira, confiro o cateter e os sinais vitais e organizo os dados para o Enf. Marcos.',
            [
              p('lauro', 'aliviado', 'Assim sentado melhora um pouco...'),
              p('marcos', 'neutro', 'O que temos, {nome}?'),
              n('Você relata os dados de forma objetiva. O Enf. Marcos assume e aciona a equipe médica.'),
            ],
            'Você tomou decisões dentro do seu papel: medidas simples e seguras, monitoramento e preparo das informações. Decidir bem também é saber o que não decidir por conta própria.',
          ),
          op(
            'parcial',
            'Saio do quarto para buscar o Enf. Marcos pessoalmente e garantir que ele venha o mais rápido possível.',
            [n('Por dois minutos, Seu Lauro fica sozinho e cada vez mais ansioso.')],
            'A intenção é garantir ajuda, mas o enfermeiro já tinha sido acionado. Deixar um paciente instável sozinho aumenta o risco; o melhor é permanecer e pedir que outra pessoa chame, se necessário.',
          ),
          op(
            'pouco',
            'Aguardo o enfermeiro chegar sem mexer em nada, para não correr o risco de fazer algo errado com o paciente.',
            [n('Seu Lauro continua deitado, com a cabeceira baixa, e mais ansioso.')],
            'Prudência é importante, mas há medidas simples e seguras que o estudante pode e deve adotar, como posicionar o paciente e checar os dispositivos. Não decidir também é uma decisão.',
          ),
          op(
            'inadequada',
            'Aumento o fluxo de oxigênio por conta própria, já que a saturação está baixa e o enfermeiro ainda não chegou.',
            [p('marcos', 'tenso', '{nome}, quem alterou o fluxo? Isso depende de avaliação e prescrição.')],
            'Alterar uma terapia sem prescrição e sem supervisão ultrapassa o limite de atuação do estudante e pode trazer riscos ao paciente. Na urgência, a decisão adequada é monitorar, adotar medidas seguras e acionar quem tem competência.',
          ),
        ],
      },
    ],
    justificativa:
      'Tomar decisões no cuidado envolve priorizar pelo risco, considerar os recursos disponíveis, delegar com clareza e reconhecer os limites da própria atuação. Para o estudante, decidir bem inclui adotar medidas seguras e acionar a supervisão no momento certo.',
    paraRefletir: 'Quando várias demandas chegam juntas, qual critério você usa de fato para escolher a primeira? Ele é o mais seguro?',
  },
];
