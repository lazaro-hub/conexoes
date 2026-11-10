import type { Missao } from '../../types';
import { n, op, p } from './helpers';

// EIXO 2: Liderança e colaboração

export const EIXO2: Missao[] = [
  {
    id: 'm05',
    eixo: 'e2',
    numero: 5,
    habilidade: 'Liderança',
    titulo: 'Coordenação da manhã',
    objetivo: 'Planejar e distribuir o cuidado com critérios, acompanhar a execução e apoiar colegas com dificuldade.',
    contexto: 'Estágio supervisionado na clínica médica, com a Profa. Helena.',
    situacaoProblema:
      'A professora pediu que você coordene um grupo de quatro estudantes responsáveis por seis pacientes, e um colega se sente inseguro com curativos.',
    comportamentos: ['Planeja com base em critérios', 'Delega considerando competências', 'Acompanha a execução e oferece suporte'],
    local: 'Clínica médica · segunda, 7h',
    cena: 'posto',
    personagens: ['helena', 'caio', 'bia'],
    medidor: 'Organização do grupo',
    etapas: [
      {
        id: 'm05e1',
        situacao: [
          n('Seu grupo tem quatro estudantes e seis pacientes para acompanhar na manhã.'),
          p('helena', 'neutro', '{nome}, hoje você coordena o grupo. Organize a divisão dos pacientes e me apresente em dez minutos.'),
          p('caio', 'preocupado', 'Eu queria pegar só os mais tranquilos. Ainda não me sinto seguro com curativo.'),
        ],
        desafio: 'Como você organiza a divisão?',
        opcoes: [
          op(
            'adequada',
            'Vejo a complexidade de cada paciente, ouço o grupo e proponho uma divisão equilibrada, com o Caio em dupla. Levo à professora.',
            [p('bia', 'feliz', 'Gostei. Ninguém fica sobrecarregado e o Caio não fica sozinho.'), p('helena', 'feliz', 'Proposta clara. Podem seguir.')],
            'Liderar envolve reunir informações, considerar a capacidade e o desenvolvimento de cada pessoa e validar decisões com quem supervisiona. A dupla com o Caio equilibra segurança do paciente e aprendizagem.',
          ),
          op(
            'parcial',
            'Divido por ordem de leito, com o mesmo número de pacientes para cada estudante, para que a divisão seja justa e rápida.',
            [p('caio', 'tenso', 'Fiquei com os dois curativos mais complexos... sozinho.')],
            'A regra é simples e parece justa, mas ignora a complexidade dos pacientes e a experiência de cada estudante. Igualdade de número nem sempre significa carga equilibrada.',
          ),
          op(
            'pouco',
            'Deixo cada um escolher os pacientes que preferir, para respeitar a autonomia do grupo, e fico com quem sobrar.',
            [n('Os pacientes mais complexos sobram para o final, e a escolha leva quinze minutos.'), p('bia', 'preocupado', 'A professora já está vindo...')],
            'Dar autonomia ao grupo é positivo, mas abrir mão da coordenação quando ela foi solicitada deixa decisões importantes ao acaso. Quem lidera também decide e assume a responsabilidade pela organização.',
          ),
          op(
            'inadequada',
            'Fico com os pacientes mais complexos, para garantir que tudo saia certo, e distribuo os demais entre os colegas.',
            [n('Você fica com quatro pacientes. Às 9h, dois cuidados ainda estão pendentes.'), p('helena', 'preocupado', '{nome}, por que você está com quatro pacientes?')],
            'Centralizar as tarefas difíceis sobrecarrega quem coordena, atrasa cuidados e tira dos colegas a oportunidade de aprender. Liderar é distribuir com critério, e não fazer tudo.',
          ),
        ],
      },
      {
        id: 'm05e2',
        situacao: [
          n('10h. O Caio está atrasado com a higiene do paciente do leito 12 e parece nervoso. Os demais estão adiantados.'),
          p('caio', 'tenso', 'Tá tudo bem, eu dou conta. Só tá demorando um pouco.'),
        ],
        desafio: 'O que você faz, como pessoa que coordena o grupo?',
        opcoes: [
          op(
            'adequada',
            'Converso com ele em particular, entendo a dificuldade e peço à Bia, que terminou, que o ajude. Informo a professora.',
            [p('caio', 'aliviado', 'Valeu. Eu travei na mudança de decúbito, ele é bem pesado.'), p('bia', 'feliz', 'Vamos juntos, Caio.')],
            'Acompanhar o andamento, investigar a dificuldade com respeito e redistribuir recursos são ações de liderança. Comunicar o ajuste à supervisão mantém a transparência.',
          ),
          op(
            'parcial',
            'Assumo pessoalmente o paciente do Caio, para que o cuidado seja concluído logo e ele possa seguir com os outros.',
            [p('caio', 'triste', 'Ah... tá bom.')],
            'O cuidado é concluído, mas o colega perde a oportunidade de aprender e pode se sentir desqualificado. Oferecer apoio costuma ser melhor do que substituir.',
          ),
          op(
            'pouco',
            'Confio no que ele disse, para não parecer que duvido da capacidade dele, e sigo com as minhas tarefas.',
            [n('Às 11h, o paciente do leito 12 ainda aguarda a higiene. A professora percebe.')],
            'Respeitar a autonomia do colega é importante, mas os sinais de dificuldade estavam claros. Quem coordena acompanha o andamento e oferece ajuda antes que o atraso afete o paciente.',
          ),
          op(
            'inadequada',
            'Aviso o grupo que o Caio está atrasado e peço que todos se apressem, para não prejudicar a avaliação de ninguém.',
            [p('caio', 'tenso', 'Valeu por me expor na frente de todo mundo.')],
            'Expor a dificuldade de um colega diante do grupo gera constrangimento e não resolve o problema. A abordagem individual e respeitosa é mais efetiva e preserva a confiança.',
          ),
        ],
      },
    ],
    justificativa:
      'Liderança, na formação em Enfermagem, aparece em comportamentos como planejar com base em critérios, delegar considerando competências, acompanhar a execução e dar suporte. Não é um traço inato, e sim uma prática que pode ser aprendida.',
    paraRefletir: 'Lembre de alguém que liderou bem um grupo do qual você participou. O que essa pessoa fazia, concretamente, que ajudava o grupo?',
  },

  {
    id: 'm06',
    eixo: 'e2',
    numero: 6,
    habilidade: 'Trabalho em equipe',
    titulo: 'Cenário de simulação',
    objetivo: 'Organizar papéis e comunicação durante uma situação simulada e analisar falhas como responsabilidade da equipe.',
    contexto: 'Aula prática no laboratório de simulação clínica, com debriefing conduzido pela Profa. Helena.',
    situacaoProblema:
      'Em um cenário simulado de paciente com falta de ar, os três estudantes agem ao mesmo tempo, sem divisão de funções. No debriefing, uma colega culpa outro pela falha.',
    comportamentos: ['Define e confirma papéis', 'Usa comunicação de alça fechada', 'Trata falhas como processo da equipe'],
    local: 'Laboratório de simulação · terça, 14h',
    cena: 'laboratorio',
    personagens: ['rafael', 'julia', 'helena'],
    medidor: 'Sintonia da equipe',
    etapas: [
      {
        id: 'm06e1',
        situacao: [
          n('Cenário: paciente simulado no pós-operatório, com queixa de falta de ar. Você, Rafael e Júlia formam a equipe.'),
          n('O cenário começa. Os três vão ao mesmo tempo para perto do monitor.'),
          p('rafael', 'tenso', 'A saturação tá caindo! Alguém faz alguma coisa!'),
        ],
        desafio: 'Nos primeiros segundos, todos fazem a mesma coisa. Como você age?',
        opcoes: [
          op(
            'adequada',
            'Distribuo as funções em voz alta (paciente, sinais vitais, chamar ajuda e registro) e confirmo quem faz o quê.',
            [p('julia', 'neutro', 'Eu fico com os sinais vitais.'), p('rafael', 'aliviado', 'Eu converso com ele e elevo a cabeceira.')],
            'Definir papéis e usar comunicação de alça fechada (dizer, confirmar e executar) evita esforços repetidos e lacunas. Uma equipe eficiente é aquela em que cada pessoa conhece a própria função e a dos outros.',
          ),
          op(
            'parcial',
            'Começo a verificar os sinais vitais, que é o mais urgente, e espero que os colegas percebam o que falta fazer.',
            [n('A Júlia também começa a verificar os sinais vitais. Ninguém chama ajuda nos primeiros dois minutos.')],
            'Agir é melhor do que ficar parado, mas, sem combinar papéis, a equipe continua descoordenada. Nesse tipo de situação, comunicar é tão importante quanto executar.',
          ),
          op(
            'pouco',
            'Tento fazer tudo pessoalmente, porque explicar as tarefas para os colegas agora tomaria um tempo precioso.',
            [n('Você verifica os sinais, eleva a cabeceira e tenta chamar ajuda ao mesmo tempo. Rafael e Júlia ficam olhando, sem saber como ajudar.')],
            'Ações centralizadas sobrecarregam uma pessoa e deixam as outras sem função, o que atrasa o cuidado. Trabalhar em equipe é coordenar o esforço de todos.',
          ),
          op(
            'inadequada',
            'Espero o Rafael, que percebeu primeiro a queda da saturação, decidir o que a equipe vai fazer.',
            [p('rafael', 'tenso', 'Eu? Eu não sei por onde começar!')],
            'Esperar que outra pessoa assuma, sem contribuir, deixa a equipe parada em um momento crítico. Todos são responsáveis por mover o grupo, ainda que alguém coordene.',
          ),
        ],
      },
      {
        id: 'm06e2',
        situacao: [
          n('No debriefing, a Profa. Helena pergunta o que poderia ter sido melhor.'),
          p('julia', 'tenso', 'O Rafael esqueceu de conferir a pulseira de identificação antes de tudo. Foi isso.'),
          p('rafael', 'triste', '...'),
        ],
        desafio: 'Como você contribui para a discussão?',
        opcoes: [
          op(
            'adequada',
            'Digo que conferir a identificação era tarefa de toda a equipe e proponho combinar quem faz isso no próximo cenário.',
            [
              p('helena', 'feliz', 'Essa é a pergunta certa: o que a equipe faz para que isso não dependa da memória de uma pessoa.'),
              p('rafael', 'aliviado', 'Valeu. Na próxima eu fico com essa checagem.'),
            ],
            'Analisar falhas como processos da equipe, e não como culpa individual, fortalece a confiança e melhora a segurança do paciente. É o princípio da cultura justa aplicado à aprendizagem.',
          ),
          op(
            'parcial',
            'Concordo que faltou conferir a identificação e sugiro que o Rafael preste mais atenção nesse ponto da próxima vez.',
            [p('rafael', 'triste', 'Tá... vou prestar.')],
            'Identificar a falha é útil, mas atribuí-la a um só colega ignora que toda a equipe poderia ter verificado. Soluções que dependem apenas de "prestar mais atenção" são frágeis.',
          ),
          op(
            'pouco',
            'Fico em silêncio, para não expor ainda mais o Rafael nem criar um clima ruim entre os colegas na frente da professora.',
            [p('helena', 'neutro', 'Mais alguém? ... Tudo bem.'), n('O tema fica sem conclusão.')],
            'Evitar o conflito parece proteger o grupo, mas o debriefing é o momento de aprender juntos. O silêncio deixa o colega sozinho com a culpa e impede que a equipe construa uma solução.',
          ),
          op(
            'inadequada',
            'Comento que eu teria conferido a pulseira se tivesse ficado com essa parte, para mostrar que o erro era evitável.',
            [p('rafael', 'tenso', 'Fácil falar depois.')],
            'Destacar o próprio desempenho em cima do erro do colega enfraquece a confiança do grupo. O foco do debriefing é a aprendizagem coletiva, e não a comparação.',
          ),
        ],
      },
    ],
    justificativa:
      'Trabalho em equipe envolve objetivos compartilhados, papéis definidos, comunicação clara e responsabilidade coletiva pelos resultados. Na simulação clínica, analisar falhas como processos da equipe favorece a segurança do paciente.',
    paraRefletir: 'Em um trabalho em grupo recente, os papéis estavam claros para todos? O que teria mudado se estivessem?',
  },

  {
    id: 'm07',
    eixo: 'e2',
    numero: 7,
    habilidade: 'Colaboração',
    titulo: 'Três cursos, uma ação',
    objetivo: 'Construir com estudantes de outras áreas um produto comum, integrando saberes e compartilhando informações de forma construtiva.',
    contexto: 'Projeto de extensão interprofissional com estudantes de Fisioterapia e Nutrição.',
    situacaoProblema:
      'O grupo precisa planejar uma ação educativa sobre prevenção de quedas para idosos da UBS. Cada curso chega com uma ideia própria, e um material produzido por uma colega traz um risco que você percebe.',
    comportamentos: ['Define objetivos comuns', 'Valoriza os saberes de cada área', 'Compartilha informações relevantes de forma construtiva'],
    local: 'Sala de reuniões do projeto · quarta, 17h',
    cena: 'reuniao',
    personagens: ['lara', 'vitor'],
    medidor: 'Integração do grupo',
    etapas: [
      {
        id: 'm07e1',
        situacao: [
          n('Você representa a Enfermagem na organização de uma ação educativa sobre prevenção de quedas para idosos da UBS.'),
          p('lara', 'neutro', 'Na Fisio, a gente pensou em fazer exercícios de equilíbrio com o grupo.'),
          p('vitor', 'neutro', 'E da Nutrição dá pra falar de alimentação e força muscular.'),
          n('O seu grupo de Enfermagem já tinha um roteiro pronto sobre segurança em casa e uso de medicamentos.'),
        ],
        desafio: 'Como você conduz a construção da ação?',
        opcoes: [
          op(
            'adequada',
            'Apresento nosso roteiro como ponto de partida e proponho montarmos juntos um único encontro, com objetivos comuns.',
            [p('lara', 'feliz', 'Assim a gente conecta tudo: o remédio que dá tontura, o tapete solto e o exercício de equilíbrio.'), p('vitor', 'feliz', 'Fechou.')],
            'Colaborar é construir com o outro um produto comum, valorizando os saberes de cada área. Definir o objetivo compartilhado antes de dividir tarefas evita uma ação fragmentada.',
          ),
          op(
            'parcial',
            'Proponho que cada curso apresente a sua parte separadamente, em sequência, para facilitar a organização do encontro.',
            [p('vitor', 'neutro', 'Pode ser. Vinte minutos para cada um, então.')],
            'A proposta é organizada e inclui todos, mas resulta em três falas paralelas, sem integração. Para os idosos, a conexão entre os temas torna a ação mais significativa.',
          ),
          op(
            'pouco',
            'Sugiro usar o nosso roteiro, que já está pronto e revisado, e que eles complementem no final, se houver tempo.',
            [p('lara', 'tenso', 'Então a gente é só complemento?')],
            'Priorizar o próprio material pode economizar tempo, mas desvaloriza a contribuição das outras áreas e reduz a participação dos colegas. Colaboração exige abertura para mudar o próprio plano.',
          ),
          op(
            'inadequada',
            'Proponho que a Enfermagem conduza a ação sozinha, já que prevenção de quedas é um tema central da nossa área.',
            [p('vitor', 'tenso', 'Ué. Então a gente foi convidado pra quê?')],
            'Reivindicar o tema como exclusivo de uma profissão contraria a lógica do cuidado interprofissional. Quedas em pessoas idosas têm múltiplas causas e se beneficiam do olhar de várias áreas.',
          ),
        ],
      },
      {
        id: 'm07e2',
        situacao: [
          n('Na véspera da ação, a Lara compartilha um vídeo de exercícios. Um deles é feito em pé, sem apoio, e você sabe que alguns idosos do grupo usam bengala.'),
          p('lara', 'feliz', 'O que acharam? Gravei ontem!'),
        ],
        desafio: 'Como você compartilha sua observação?',
        opcoes: [
          op(
            'adequada',
            'Elogio o vídeo, conto que alguns participantes usam bengala e pergunto à Lara se dá para adaptar o exercício.',
            [p('lara', 'feliz', 'Boa! Dá pra fazer com apoio no encosto da cadeira. Vou regravar essa parte.')],
            'Compartilhar informações relevantes de forma construtiva, reconhecendo o trabalho do outro, é um comportamento central da colaboração. A observação aumenta a segurança da ação e preserva a parceria.',
          ),
          op(
            'parcial',
            'Elogio o vídeo e, no dia da ação, aviso os idosos que usam bengala para não fazerem esse exercício específico.',
            [n('No dia, três idosos ficam sentados, olhando os outros, durante parte da atividade.')],
            'Você protegeu os participantes, mas resolveu por conta própria um problema que poderia ter sido resolvido em conjunto e com melhor resultado. Compartilhar antes permitiria adaptar o exercício para todos.',
          ),
          op(
            'pouco',
            'Falo com o professor do projeto para que ele peça à Lara que mude o vídeo, sem criar constrangimento entre nós.',
            [p('lara', 'triste', 'Por que você não falou comigo direto?')],
            'Acionar a supervisão pode ser necessário em alguns casos, mas aqui a conversa direta seria mais simples e respeitosa. Contornar a colega enfraquece a parceria.',
          ),
          op(
            'inadequada',
            'Não comento nada, já que exercícios são da área da Fisioterapia e a Lara tem mais conhecimento sobre isso.',
            [n('No dia, uma participante se desequilibra durante o exercício e é amparada a tempo.')],
            'Respeitar a especialidade do outro não significa omitir uma informação de segurança que você tem. Na colaboração, cada pessoa contribui com o que observa, inclusive quando o tema é de outra área.',
          ),
        ],
      },
    ],
    justificativa:
      'Colaboração interprofissional envolve objetivos comuns, reconhecimento dos saberes de cada profissão e troca respeitosa de informações. Essa competência está associada a um cuidado mais seguro e integral.',
    paraRefletir: 'Que conhecimento de outra profissão da saúde já mudou a forma como você entende um cuidado de Enfermagem?',
  },

  {
    id: 'm08',
    eixo: 'e2',
    numero: 8,
    habilidade: 'Negociação',
    titulo: 'Dois sábados de campanha',
    objetivo: 'Identificar interesses por trás das posições, buscar opções de ganho mútuo e formalizar um acordo claro.',
    contexto: 'Organização do grupo de estágio para uma campanha de vacinação na UBS.',
    situacaoProblema:
      'O grupo precisa cobrir dois sábados de campanha, com pelo menos duas pessoas por dia. Cada estudante tem restrições diferentes, e você também tem um compromisso.',
    comportamentos: ['Separa posições de interesses', 'Gera opções antes de decidir', 'Formaliza e valida o acordo'],
    local: 'Sala de aula · quinta, 12h',
    cena: 'sala-aula',
    personagens: ['bia', 'rafael', 'helena'],
    medidor: 'Acordo do grupo',
    etapas: [
      {
        id: 'm08e1',
        situacao: [
          n('O grupo precisa cobrir dois sábados de campanha de vacinação na UBS, com pelo menos duas pessoas em cada dia. Você tem um compromisso familiar no segundo sábado.'),
          p('bia', 'preocupado', 'Eu trabalho sábado de manhã. Se eu faltar, perco o emprego.'),
          p('rafael', 'tenso', 'Todo mundo tem compromisso. Vamos sortear e pronto, é o mais justo.'),
        ],
        desafio: 'Como você conduz a negociação?',
        opcoes: [
          op(
            'adequada',
            'Proponho que cada um diga o que precisa e por quê, incluindo o meu compromisso, antes de pensar em opções.',
            [p('bia', 'aliviado', 'Eu só não posso de manhã. À tarde eu consigo!'), p('rafael', 'neutro', 'Tá, faz sentido ver as possibilidades antes.')],
            'Negociar bem é separar posições ("vamos sortear", "não posso") de interesses (manter o emprego, ter justiça). Quando os interesses aparecem, surgem opções que atendem a todos.',
          ),
          op(
            'parcial',
            'Aceito o sorteio, mas peço que a Bia seja liberada por causa do trabalho, já que o caso dela é mais sério que os outros.',
            [p('rafael', 'tenso', 'Aí não é sorteio, né?')],
            'Você considerou a necessidade da colega, mas tentou ajustar a solução de uma pessoa sem ouvir os interesses de todos. Isso gera sensação de privilégio e enfraquece o acordo.',
          ),
          op(
            'pouco',
            'Concordo com o sorteio e sugiro que quem não puder no dia sorteado troque depois com algum colega.',
            [p('bia', 'triste', 'Então eu é que vou ter que me virar.')],
            'Transferir o conflito para depois apenas adia o problema e penaliza quem tem menos flexibilidade. Um acordo precisa ser viável para todos no momento em que é feito.',
          ),
          op(
            'inadequada',
            'Escolho logo o primeiro sábado, já que tenho um compromisso no segundo, e deixo os demais se organizarem.',
            [p('rafael', 'tenso', 'Ah, então quem fala primeiro escolhe?')],
            'Defender apenas o próprio interesse rompe o espírito da negociação e reduz a confiança no grupo. Seu compromisso é legítimo, mas precisa entrar na conversa junto com o dos outros.',
          ),
        ],
      },
      {
        id: 'm08e2',
        situacao: [
          n('Surge uma proposta: a Bia fica com as tardes dos dois sábados, Rafael e Caio com as manhãs, e você cobre o primeiro sábado inteiro.'),
          p('rafael', 'neutro', 'Por mim, fechou. Mas e se alguém faltar?'),
        ],
        desafio: 'Como você finaliza o acordo?',
        opcoes: [
          op(
            'adequada',
            'Resumo o combinado, definimos substitutos para imprevistos, registramos por escrito e levamos à professora.',
            [p('helena', 'feliz', 'Divisão clara e com plano B. Aprovado.')],
            'Um acordo se sustenta quando é claro, registrado e validado por quem precisa autorizá-lo. Antecipar imprevistos faz parte da negociação.',
          ),
          op(
            'parcial',
            'Registro a divisão no grupo de mensagens da turma e peço que cada um avise a professora sobre o seu dia.',
            [n('Dois colegas esquecem de avisar, e a professora descobre a mudança na véspera.')],
            'Registrar foi importante, mas a falta de uma validação conjunta e de um plano para faltas deixa o acordo frágil.',
          ),
          op(
            'pouco',
            'Digo que, se alguém faltar, a gente resolve na hora, porque o grupo sempre deu um jeito nessas situações.',
            [n('No segundo sábado, o Caio adoece. Ninguém sabe quem deveria substituí-lo.')],
            'Deixar o imprevisto sem combinação é contar com a sorte. Negociar inclui antecipar riscos e definir responsabilidades.',
          ),
          op(
            'inadequada',
            'Fecho o acordo e, ao avisar a professora, digo que fui eu quem organizou tudo, para facilitar a comunicação.',
            [p('bia', 'tenso', 'Foi todo mundo junto, né?')],
            'Assumir individualmente o mérito de uma construção coletiva compromete a confiança do grupo e as próximas negociações.',
          ),
        ],
      },
    ],
    justificativa:
      'Negociação envolve identificar os interesses por trás das posições, gerar opções de ganho mútuo e formalizar acordos claros. Na Enfermagem, essa habilidade aparece na organização de escalas, na divisão de tarefas e na construção de planos de cuidado com usuários e famílias.',
    paraRefletir: 'Em uma negociação recente da sua vida, qual era a posição da outra pessoa e qual era o interesse por trás dela?',
  },

  {
    id: 'm09',
    eixo: 'e2',
    numero: 9,
    habilidade: 'Manejo de conflitos',
    titulo: 'Tensão no posto',
    objetivo: 'Reduzir a tensão de um conflito no momento em que ele ocorre e conduzir uma conversa que trate suas causas.',
    contexto: 'Estágio na clínica médica, durante o horário de medicação.',
    situacaoProblema:
      'Um técnico de enfermagem sobrecarregado e uma colega de estágio discutem em voz alta no posto de enfermagem, à vista de pacientes e familiares.',
    comportamentos: ['Reduz a tensão no momento', 'Escolhe local e hora adequados', 'Descreve fatos e propõe acordos'],
    local: 'Posto de enfermagem · segunda, 10h',
    cena: 'posto',
    personagens: ['edson', 'julia', 'marcos'],
    medidor: 'Clima da equipe',
    etapas: [
      {
        id: 'm09e1',
        situacao: [
          n('Horário de medicação. A Júlia pediu ao Sr. Edson que conferisse um material com ela.'),
          p('edson', 'tenso', 'Estudante só atrasa a gente! Eu tenho doze pacientes e vocês ficam perguntando o tempo todo!'),
          p('julia', 'tenso', 'A gente está aprendendo! O senhor não precisa falar assim!'),
          n('Familiares no corredor olham para o posto.'),
        ],
        desafio: 'A discussão acontece na frente de pacientes e familiares. O que você faz?',
        opcoes: [
          op(
            'adequada',
            'Reconheço a pressão do Sr. Edson e proponho levar a dúvida à supervisão e continuar a conversa depois, em particular.',
            [p('edson', 'neutro', '...Tá. Depois da medicação a gente vê isso.'), p('julia', 'aliviado', 'Tudo bem.')],
            'Interromper a escalada, reconhecer a pressão vivida pelo outro e levar a conversa para um espaço reservado protegem os pacientes e as pessoas envolvidas. Manejar conflitos começa por reduzir a tensão do momento.',
          ),
          op(
            'parcial',
            'Levo a Júlia para fora do posto, sem dizer nada ao Sr. Edson, para tirar a colega daquela situação o quanto antes.',
            [p('julia', 'tenso', 'Por que você me tirou de lá? Ele é que estava errado!')],
            'Sair da cena reduz a exposição, mas tomar partido em silêncio deixa a outra pessoa sem resposta e o conflito sem caminho para ser resolvido.',
          ),
          op(
            'pouco',
            'Defendo a Júlia na hora, dizendo ao Sr. Edson que estudantes têm direito de aprender e que ele está sendo grosseiro com ela.',
            [p('edson', 'tenso', 'Agora são dois contra um? Ótimo.')],
            'A defesa da colega é compreensível, mas, feita no calor do momento e em público, amplia o conflito e reforça a ideia de lados opostos.',
          ),
          op(
            'inadequada',
            'Continuo minhas tarefas sem intervir, porque a discussão é entre eles e minha entrada poderia piorar o clima.',
            [n('A discussão continua por mais um minuto. Uma familiar comenta: "Nossa, que clima."')],
            'Ignorar um conflito público não o resolve e permite que ele afete os pacientes e a imagem da equipe. Intervir com calma é uma responsabilidade de quem está presente.',
          ),
        ],
      },
      {
        id: 'm09e2',
        situacao: [
          n('Depois da medicação, o clima ainda está pesado. O Enf. Marcos chama você.'),
          p('marcos', 'neutro', 'Fiquei sabendo de uma discussão no posto. Vocês querem conversar sobre isso?'),
        ],
        desafio: 'Como você contribui para resolver a situação?',
        opcoes: [
          op(
            'adequada',
            'Proponho uma conversa entre os três e o Enf. Marcos, com fatos, necessidades de cada lado e um horário fixo para dúvidas.',
            [
              p('edson', 'aliviado', 'Se tiver um horário pra dúvida, fica melhor pra mim também. Desculpa pelo jeito, Júlia.'),
              p('julia', 'aliviado', 'Eu também me exaltei.'),
            ],
            'Descrever fatos, expressar necessidades e propor acordos concretos é a base da comunicação não violenta e do manejo construtivo de conflitos. O combinado resolve a causa, e não só o episódio.',
          ),
          op(
            'parcial',
            'Sugiro que a Júlia peça desculpas ao Sr. Edson, já que ela também se exaltou, para encerrar logo o assunto.',
            [p('julia', 'triste', 'Só eu?')],
            'Encerrar rápido parece pacificar, mas uma solução unilateral não trata a causa (a sobrecarga e a falta de um momento para dúvidas) e pode gerar ressentimento.',
          ),
          op(
            'pouco',
            'Conto ao Enf. Marcos a minha versão dos fatos, destacando o comportamento do Sr. Edson com a Júlia.',
            [p('marcos', 'neutro', 'Vou ouvir também o Sr. Edson antes de qualquer coisa.')],
            'Levar o caso à supervisão é válido, mas apresentar apenas um lado transforma a conversa em denúncia e dificulta uma solução conjunta.',
          ),
          op(
            'inadequada',
            'Digo que a situação já passou e que voltar ao assunto agora só traria mais desgaste para a equipe.',
            [n('Na semana seguinte, uma nova discussão acontece pelo mesmo motivo.')],
            'Evitar a conversa deixa intacta a causa do conflito, que tende a se repetir. Conflitos bem manejados podem melhorar a organização da equipe.',
          ),
        ],
      },
    ],
    justificativa:
      'Conflitos fazem parte do trabalho em saúde. Manejá-los envolve reduzir a tensão no momento, escolher local e hora adequados, descrever fatos sem rótulos, ouvir as necessidades de cada parte e construir acordos que tratem as causas.',
    paraRefletir: 'Diante de um conflito, você tende a evitar, enfrentar ou mediar? Em que situações cada reação ajuda ou atrapalha?',
  },
];
