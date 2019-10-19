// Click event
AFRAME.registerComponent('cursor-listener', {
  init: function () {
    this.el.addEventListener('click', function () {
      let funcName = this.getAttribute('cursor-listener');
      eval(funcName);
    });
  }
});


// シナリオ設定
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
      [1, 'キミのおかげで、のこたんをたすけることができたにょん！　ほんとうにありがとうだにょん！　キミはボクのヒーローだにょん♪']
    ],
    mission: {
      num: 3,
      title: 'サルにトウガラシをなげよう！',
      targetImage: 'saru_saruyama_boss_text.png',
      imgPosition: '0 2.5 -8',
      rotation: '0 0 0',
      aspectRatio: '2:2'
    }
  }
};




let elmScene,
    elmSky,
    elmTextArea,
    // elmText,
    elmMissionHeadline,
    elmMissionHeadlineText,
    elmMissionTitle,
    elmMissionTargetImg,
    elmCamera;

let nowSceneNum = 1,
    nowSceneData,
    nowScenarioNum;

const fonts = {
  main: 'fonts/MPLUSRounded1c-Bold-msdf/MPLUSRounded1c-Bold-msdf.json'
};


// HTMLが全て読み込まれた時に各要素取得
window.onload = () => {
  elmScene = document.getElementById('scene');
  elmCamera = document.getElementById('camera');
  elmSky = document.getElementById('sky');

  getImg();
}

// 画像をプリロード
// const getImg = () => {
//   const preloadImages = document.createElement('div');
  
//   for (let i = 0; i < Object.keys(sceneConfig).length; i++) {
//     const scene = sceneConfig['scene'+(i+1)];
//     console.log(scene);

//     let bgImg = document.createElement('img');
//     bgImg.src = 'images/background/' + scene.backgroundImage;
//     preloadImages.appendChild(bgImg);

//     let targetImg = document.createElement('img');
//     targetImg.src = 'images/target/' + scene.mission.targetImage;
//     preloadImages.appendChild(targetImg);
//   }

//   preloadImages.addEventListener('load', () => {
//     console.log('done loading');
//     // 「読み込み中」テキストを削除
//     const elmLoadText = document.getElementById('loading');
//     elmLoadText.parentNode.removeChild(elmLoadText);
//     // A-Frameエリアを表示
//     elmScene.removeAttribute('style');
//   })
// }
const getImg = () => {

  let imagesUrl = [];
  for (let i = 0; i < Object.keys(sceneConfig).length; i++) {
    const scene = sceneConfig['scene'+(i+1)];
    console.log(sceneConfig);
    console.log(scene);

    imagesUrl.push('images/background/' + scene.backgroundImage);
    imagesUrl.push('images/target/' + scene.mission.targetImage);
  }

  let images = new Array(imagesUrl.length)
  let loadingCount = 0

  const mainEvent = () => {
    // 「読み込み中」テキストを削除
    const elmLoadText = document.getElementById('loading');
    elmLoadText.parentNode.removeChild(elmLoadText);
    // A-Frameエリアを表示
    elmScene.removeAttribute('style');
    console.log('complete')
  }

  for (let i = 0; i < imagesUrl.length; i++) {
    images[i] = new Image()
    images[i].src = imagesUrl[i]
    images[i].crossOrigin = "Anonymous";
    images[i].addEventListener('load', () => {
      loadingCount++
      if (loadingCount === images.length - 1) {
        mainEvent()
      }
    })
  }
}


// 任意のElementsを削除する関数
const removeElms = (elms) => {
  elms.forEach(elm => {
    elmScene.removeChild(elm);
  });
}

// Game start
const startGame = () => {
  
  // Remove elements in #display-area
  removeElms(document.querySelectorAll('.toppage-elm'));

  // セリフ等テキストの表示エリア
  elmTextArea = document.createElement('a-entity');
  elmTextArea.id = 'text-area';
  elmTextArea.setAttribute('geometry', 'primitive: plane; width: 5.3; height: 1.6');
  elmTextArea.setAttribute('material', 'color: black; opacity: 0.6');
  elmTextArea.setAttribute('position', '0 -0.1 -5');

  // 「次へ」ボタン
  elmNextBtn = document.createElement('a-entity');
  elmNextBtn.setAttribute('cursor-listener', 'nextScenario()');
  elmNextBtn.setAttribute('geometry', 'primitive: plane; width: 1; height: 0.5');
  elmNextBtn.setAttribute('material', 'color: green');
  elmNextBtn.setAttribute('position', '2.1 -0.7 -4.9');
  // 「次へ」テキスト
  elmNextBtnText = document.createElement('a-text');
  elmNextBtnText.setAttribute('value', '次へ➡︎');
  elmNextBtnText.setAttribute('color', 'white');
  elmNextBtnText.setAttribute('font', fonts.main);
  elmNextBtnText.setAttribute('width', '5');
  elmNextBtnText.setAttribute('negate', 'false');
  elmNextBtnText.setAttribute('align', 'center');
  elmNextBtnText.setAttribute('position', '0 0 0.1');

  // ミッション見出し
  elmMissionHeadline = document.createElement('a-entity');
  elmMissionHeadline.setAttribute('geometry', 'primitive: box; depth: 0.3; width: 1.4; height: 0.5');
  elmMissionHeadline.setAttribute('material', 'color: red');
  elmMissionHeadline.setAttribute('visible', 'false');
  elmMissionHeadline.setAttribute('position', '0 0.6 -4.9');
  // ミッション見出しテキスト
  elmMissionHeadlineText = document.createElement('a-text');
  elmMissionHeadlineText.setAttribute('value', 'ミッション');
  elmMissionHeadlineText.setAttribute('color', 'white');
  elmMissionHeadlineText.setAttribute('font', fonts.main);
  elmMissionHeadlineText.setAttribute('width', '6');
  elmMissionHeadlineText.setAttribute('negate', 'false');
  elmMissionHeadlineText.setAttribute('align', 'center');
  elmMissionHeadlineText.setAttribute('position', '0 0 0.2');

  // ミッションのターゲットになる画像
  elmMissionTargetImg = document.createElement('a-image');
  elmMissionTargetImg.setAttribute('cursor-listener', 'missionSuccess()');
  elmMissionTargetImg.setAttribute('scale', '2 2 2');
  elmMissionTargetImg.setAttribute('visible', 'false');



  // それぞれ子要素に追加
  // elmTextArea.appendChild(elmText);
  elmScene.appendChild(elmTextArea);

  elmNextBtn.appendChild(elmNextBtnText);
  elmScene.appendChild(elmNextBtn);

  elmMissionHeadline.appendChild(elmMissionHeadlineText);
  elmScene.appendChild(elmMissionHeadline);

  elmScene.appendChild(elmMissionTargetImg);
  

  nextScene();
}



// シーン切り替え
const nextScene = () => {
  // 最後のシーンだったら（ゲームクリアしたら
  if (nowSceneNum - 1 === Object.keys(sceneConfig).length) {
    endGame();
    return;
  } else {
    nowSceneData = sceneConfig['scene'+nowSceneNum];
    nowScenarioNum = 0;

    // 背景画像
    elmSky.setAttribute('src', 'images/background/'+nowSceneData.backgroundImage);
    // ミッション画像
    elmMissionTargetImg.setAttribute('src', 'images/target/'+nowSceneData.mission.targetImage);
    elmMissionTargetImg.setAttribute('position', nowSceneData.mission.imgPosition);
    elmMissionTargetImg.setAttribute('rotation', nowSceneData.mission.rotation);
    elmMissionTargetImg.setAttribute('visible', 'false');

    // アスペクト比
    const arrayAspectRatio = nowSceneData.mission.aspectRatio.split(':');
    elmMissionTargetImg.setAttribute('width', arrayAspectRatio[0]);
    elmMissionTargetImg.setAttribute('height', arrayAspectRatio[1]);
    
    nextScenario();
  }
}



// シナリオ進行
const nextScenario = () => { 
  // 今のシーンのシナリオが全て終わったら
  console.log(nowSceneData.scenario);
  if (nowScenarioNum === nowSceneData.scenario.length) {
    nowSceneNum++;
    nextScene();
    return;
  }

  if (document.getElementById('text')) elmTextArea.removeChild(document.getElementById('text')); 

  // ミッションが指定されていたら
  if (nowSceneData.mission.num === nowScenarioNum + 1) {
    startMission();
  } else {
    flipPage();
  }
}



// 次のシナリオテキストへ
const flipPage = () => {
  let scenarioText = '';
  nowSceneData.scenario[nowScenarioNum][1].split(/(.{24})/).filter((e) => {
    return e;
  }).forEach((str) => {
    scenarioText += str + '\n'
  });

  let elmText = document.createElement('a-text');
  elmText.setAttribute('font', fonts.main);
  elmText.setAttribute('color', 'white');
  elmText.setAttribute('width', '5');
  elmText.setAttribute('align', 'left');
  elmText.setAttribute('negate', 'false');
  elmText.setAttribute('position', '-2.4 0.2 0.1');
  elmText.setAttribute('value', scenarioText);
  elmText.id = 'text';

  elmTextArea.appendChild(elmText);

  nowScenarioNum++;
}




// ミッション
const startMission = () => {

  elmMissionHeadline.setAttribute('visible', 'true');
  elmMissionTargetImg.setAttribute('visible', 'true');

  // ミッションタイトル
  elmMissionTitle =  document.createElement('a-text');
  elmMissionTitle.setAttribute('color', 'orange');
  elmMissionTitle.setAttribute('font', fonts.main);
  elmMissionTitle.setAttribute('width', '6');
  elmMissionTitle.setAttribute('negate', 'false');
  elmMissionTitle.setAttribute('align', 'center');
  elmMissionTitle.setAttribute('value', nowSceneData.mission.title);
  elmMissionTitle.setAttribute('position', '0 0 0.1');
  elmMissionTitle.id = 'mission-title';
  elmTextArea.appendChild(elmMissionTitle);

  elmNextBtn.setAttribute('visible', 'false');

}



// ミッションを達成した時
const missionSuccess = () => {
  elmMissionHeadline.setAttribute('visible', 'false');

  elmTextArea.removeChild(elmMissionTitle);
  elmNextBtn.setAttribute('visible', 'true');
  elmMissionTargetImg.setAttribute('visible', 'false');
  // elmText.setAttribute('visible', 'true');

  // camera固定に「ミッションクリア！」と数秒間だけ表示する


  nowSceneData.mission.num = null;

  nextScenario()
}



// ゲームクリア
const endGame = () => {
  elmTextArea.setAttribute('visible', 'false');
  elmNextBtn.setAttribute('visible', 'false');

  let elmCongrats = document.createElement('a-text');
  elmCongrats.setAttribute('value', 'ゲームクリア！');
  elmCongrats.setAttribute('color', 'white');
  elmCongrats.setAttribute('font', fonts.main);
  elmCongrats.setAttribute('width', '15');
  elmCongrats.setAttribute('negate', 'false');
  elmCongrats.setAttribute('align', 'center');
  elmCongrats.setAttribute('position', '0 1.4 -4');

  elmScene.appendChild(elmCongrats);
}
