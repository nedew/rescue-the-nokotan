// シナリオ
let sceneConfig = {
  scene1: {
    backgroundImage: 'gate.jpg',
    scenario: [
      [1, 'おーい、そこのキミ！'],
      [1, 'はじめまして、ボクは竹から生まれた『たけにょん』だにょん♪'],
      [1, 'じつは、さっきまで妹の『のこたん』といっしょにこのあたりをあるいていたんだけど、とつぜんうしろから『サル』にぶつかられたんだにょん！'],
      [1, 'なんとか立ちあがったけど、そのサルにのこたんをさらわれてしまったにょん・・・あの子がいないとボクは・・・'],
      [1, '・・・え、キミがのこたんをさがすのをてつだってくれるの？　ありがとうだにょん！　じゃあさっそくだけどボクについてきてにょん！']
    ],
    mission: {
      num: 2,
      title: 'たけにょんをみつけよう！',
      targetImage: 'take2-1-08.png',
      imgPosition: '4.5 1 -3',
      rotation: '0 -60 0',
      aspectRatio: '0.6:1' // width:height
    }
  },
  scene2: {
    backgroundImage: 'road.jpg',
    scenario: [
      [1, 'ここがボクがぶつかられたばしょだにょん。そのときのことを見ていた人がいるとおもうんだけど・・・あ！　あの女の人にはなしをきいてみるにょん！'],
      [1, 'あの！　ボクにぶつかってきたサルがどっちににげていったか見てないにょん？'],
      [2, 'たしか・・・あっちだったとおもいますよ'],
      [1, 'おしえてくれてありがとうだにょん！　キミ、つぎはあっちにいってみるにょん！']
    ],
    mission: {
      num: 2,
      title: '女の人にはなしをきいてみよう！',
      targetImage: 'walking5_woman.png',
      imgPosition: '-1.3 1.3 4',
      rotation: '0 -180 0',
      aspectRatio: '0.73:1'
    }
  },
  scene3: {
    backgroundImage: 'torii.jpg',
    scenario: [
      [1, 'このあたりにサルがいるはずにょん！　さがしてみるにょん！'],
      [3, 'ウキキ！　のこたんをかえしてほしいなら『池』にくるウキ！'],
      [1, 'あ、にげたにょん！　おいかけるにょん！'],
    ],
    mission: {
      num: 2,
      title: 'サルをみつけろ！',
      targetImage: 'animal_monkey_kinobori.png',
      imgPosition: '4.2 5 3.8',
      rotation: '-20 55 0',
      aspectRatio: '1.2:1.2'
    }
  },
  scene4: {
    backgroundImage: 'shop.jpg',
    scenario: [
      [1, 'サルににげられてしまったにょん・・・。池にいくまえに、サルのにがてなたべものを買っていくにょん！'],
      [1, 'ちゃんと買えたにょん？　それじゃあ、池にレッツゴーだにょん！'],
    ],
    mission: {
      num: 2,
      title: 'サルのにがてなたべもの\n『トウガラシ』を買っていこう！',
      targetImage: 'tougarashi_redpepper_text.png',
      imgPosition: '5 1 6.2',
      rotation: '0 225 0',
      aspectRatio: '1.4:1.4'
    }
  },
  scene5: {
    backgroundImage: 'pond.jpg',
    scenario: [
      [3, 'ウキキ！　オレのナワバリにくるとは、バカなやつらウキ！　おまえたち、やってしまうウキ！'],
      [1, 'キミ、さっき買っておいたトウガラシをサルたちになげるにょん！'],
      [3, 'ウキ！？　そ、それはトウガラシ！　にげるウキー！'],
      [1, 'やったにょん！　サルをおいはらったにょん！　のこたんは・・・あ、いたにょん！　あの子がのこたんだにょん！'],
      [1, 'キミのおかげで、のこたんをたすけることができたにょん！　ほんとうにありがとうだにょん！　キミはボクのヒーローだにょん♪', 'nokotan']
    ],
    mission: {
      num: 3,
      title: 'サルにトウガラシをなげよう！',
      targetImage: 'saru_saruyama_boss_text.png',
      imgPosition: '0 1 7',
      rotation: '0 -180 0',
      aspectRatio: '2:2'
    }
  }
};


// キャラクター
const personConfig = [
  {
    displayName: 'たけにょん',
    img: 'tatie_takenyon.png',
    label: 'takenyon',
    scale: '1 1 1',
    position: '1 1 1'
  },
  {
    displayName: 'おんなのひと',
    img: 'tatie_woman.png',
    label: 'woman',
    scale: '1 1 1',
    position: '1 1 1'
  },
  {
    displayName: 'さる',
    img: 'tatie_saru.png',
    label: 'saru',
    scale: '1 1 1',
    position: '1 1 1'
  }
];