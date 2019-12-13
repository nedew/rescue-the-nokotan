let elmScene,
    elmSky,
    elmTextArea,
    // elmText,
    elmMissionHeadline,
    elmMissionHeadlineText,
    elmMissionTitle,
    elmMissionTargetImg,
    elmCamera,
    elmPersonArea;

let nowSceneNum = 1,
    nowSceneData,
    nowScenarioNum,
    nowPerson;

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


const getImg = () => {

  let imagesUrl = [];
  for (let i = 0; i < Object.keys(sceneConfig).length; i++) {
    const scene = sceneConfig['scene'+(i+1)];
    console.log(sceneConfig);
    console.log(scene);

    imagesUrl.push('images/background/' + scene.backgroundImage);
    imagesUrl.push('images/target/' + scene.mission.targetImage);
  }
  for (let i = 0; i < Object.keys(personConfig).length; i++) {
    imagesUrl.push('images/person/' + personConfig[i].img);
  }
  imagesUrl.push('images/other/take2-1-07.png');

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
  elmTextArea.setAttribute('geometry', 'primitive: plane; width: 5.3; height: 2');
  elmTextArea.setAttribute('material', 'color: black; opacity: 0.6');
  elmTextArea.setAttribute('position', '0 -0.1 -5');

  // 「次へ」ボタン
  elmNextBtn = document.createElement('a-entity');
  elmNextBtn.setAttribute('cursor-listener', 'nextScenario()');
  elmNextBtn.setAttribute('geometry', 'primitive: plane; width: 1; height: 0.42');
  elmNextBtn.setAttribute('material', 'color: #006A4D');
  elmNextBtn.setAttribute('position', '2 -0.7 -4.9');
  // 「次へ」テキスト
  elmNextBtnText = document.createElement('a-text');
  elmNextBtnText.setAttribute('value', 'つぎへ');
  elmNextBtnText.setAttribute('color', 'white');
  elmNextBtnText.setAttribute('font', fonts.main);
  elmNextBtnText.setAttribute('width', '6');
  elmNextBtnText.setAttribute('negate', 'false');
  elmNextBtnText.setAttribute('align', 'center');
  elmNextBtnText.setAttribute('position', '-0.03 0.07 0.1');

  // ミッション見出し
  elmMissionHeadline = document.createElement('a-entity');
  elmMissionHeadline.setAttribute('geometry', 'primitive: box; depth: 0.3; width: 1.4; height: 0.5');
  elmMissionHeadline.setAttribute('material', 'color: red');
  elmMissionHeadline.setAttribute('visible', 'false');
  elmMissionHeadline.setAttribute('position', '0 0.8 -4.9');
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

  // 話者の名前を表示する場所
  elmPersonArea = document.createElement('a-entity');
  elmPersonArea.setAttribute('geometry', 'primitive: plane; width: 1.3; height: 0.3');
  elmPersonArea.setAttribute('material', 'color: #4169e1');
  elmPersonArea.setAttribute('visible', 'true');
  elmPersonArea.setAttribute('position', '0 0.7 -4.8');

  // 登場人物名と立ち絵
  for (let i = 0; Object.keys(personConfig).length > i; i++) {
    const person = personConfig[i];
    console.log(person);

    let elmPersonName = document.createElement('a-text');
    elmPersonName.setAttribute('value', person.displayName);
    elmPersonName.setAttribute('color', 'white');
    elmPersonName.setAttribute('font', fonts.main);
    elmPersonName.setAttribute('align', 'center');
    elmPersonName.setAttribute('width', '5');
    elmPersonName.setAttribute('negate', 'false');
    elmPersonName.setAttribute('visible', 'false');
    elmPersonName.classList.value = person.label;
    elmPersonArea.appendChild(elmPersonName);

    let elmPersonImg = document.createElement('a-image');
    elmPersonImg.setAttribute('src', 'images/person/'+person.img);
    elmPersonImg.setAttribute('visible', 'false');
    elmPersonImg.setAttribute('position', '-0.06 0.6 -0.1');
    elmPersonImg.classList.value = person.label;
    elmPersonArea.appendChild(elmPersonImg);
  }


  // let elmBGM = document.createElement('audio');
  // elmBGM.setAttribute('src', 'sounds/bgm/bgm_maoudamashii_8bit22.mp3');
  // elmBGM.setAttribute('loop', 'loop');
  // elmBGM.setAttribute('autoplay', 'autoplay');
  // elmBGM.id = 'bgm';
  // elmBGM.volume = 0.1;
  // document.getElementsByTagName('body')[0].appendChild(elmBGM);

  let elmSoundGameclear = document.createElement('audio');
  elmSoundGameclear.setAttribute('src', 'sounds/sound-effect/game_maoudamashii_9_jingle01.mp3');
  elmSoundGameclear.volume = 0.2;
  elmSoundGameclear.id = 'gameclear';
  document.getElementsByTagName('body')[0].appendChild(elmSoundGameclear);

  let elmMainSE = document.createElement('audio');
  elmMainSE.setAttribute('src', 'sounds/sound-effect/se_maoudamashii_system37.mp3');
  elmMainSE.volume = 0.2;
  elmMainSE.id = 'se';
  document.getElementsByTagName('body')[0].appendChild(elmMainSE);



  // それぞれ子要素に追加
  // elmTextArea.appendChild(elmText);
  elmScene.appendChild(elmTextArea);

  elmNextBtn.appendChild(elmNextBtnText);
  elmScene.appendChild(elmNextBtn);

  elmMissionHeadline.appendChild(elmMissionHeadlineText);
  elmScene.appendChild(elmMissionHeadline);

  elmScene.appendChild(elmMissionTargetImg);

  elmScene.appendChild(elmPersonArea);
  

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
  // SE
  document.getElementById('se').play();

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
  } else if (nowSceneData.scenario[nowScenarioNum][2] === 'nokotan') { // のこたん救出用（後で消す）
    rescueNokotan();
    console.log('割り込みミッション');
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
    scenarioText += str + '\n';
  });

  let nextPerson = nowSceneData.scenario[nowScenarioNum][0];
  if (nowPerson !== nextPerson) {
    if (nowPerson) {
      let elmNowPerson = Array.from(document.getElementsByClassName(personConfig[nowPerson - 1].label));
      elmNowPerson.forEach(e => {
        e.setAttribute('visible', 'false');
      });
    }

    let elmNextPerson = Array.from(document.getElementsByClassName(personConfig[nextPerson - 1].label));
    elmNextPerson.forEach(e => {
      e.setAttribute('visible', 'true');
    });

    nowPerson = nextPerson;
  }
  

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
  elmMissionTitle.setAttribute('width', '7');
  elmMissionTitle.setAttribute('negate', 'false');
  elmMissionTitle.setAttribute('align', 'center');
  elmMissionTitle.setAttribute('value', nowSceneData.mission.title);
  elmMissionTitle.setAttribute('position', '0 0 0.1');
  elmMissionTitle.id = 'mission-title';
  elmTextArea.appendChild(elmMissionTitle);

  elmNextBtn.setAttribute('visible', 'false');
  elmPersonArea.setAttribute('visible', 'false');
}



// ミッションを達成した時
const missionSuccess = () => {
  // SE
  document.getElementById('se').play();

  console.log('test');
  elmMissionHeadline.setAttribute('visible', 'false');

  elmTextArea.removeChild(elmMissionTitle);
  elmNextBtn.setAttribute('visible', 'true');
  elmPersonArea.setAttribute('visible', 'true');
  elmMissionTargetImg.setAttribute('visible', 'false');
  // elmText.setAttribute('visible', 'true');

  // camera固定に「ミッションクリア！」と数秒間だけ表示する


  nowSceneData.mission.num = null;

  nextScenario()
}



// ゲームクリア
const endGame = () => {
  // document.getElementById('bgm').pause();
  document.getElementById('gameclear').play();

  elmTextArea.setAttribute('visible', 'false');
  elmNextBtn.setAttribute('visible', 'false');
  elmPersonArea.setAttribute('visible', 'false');

  let elmCongrats = document.createElement('a-text');
  elmCongrats.setAttribute('value', 'ゲームクリア！');
  elmCongrats.setAttribute('color', '#FBBC05');
  elmCongrats.setAttribute('font', fonts.main);
  elmCongrats.setAttribute('width', '15');
  elmCongrats.setAttribute('negate', 'false');
  elmCongrats.setAttribute('align', 'center');
  elmCongrats.setAttribute('position', '0 2.2 -4');

  let elmTakenokoImg = document.createElement('a-image');
  elmTakenokoImg.setAttribute('src', 'images/other/take2-1-07.png');
  elmTakenokoImg.setAttribute('position', '0 0.8 -4.1');
  elmTakenokoImg.setAttribute('width', '1');
  elmTakenokoImg.setAttribute('height', '1.7');
  

  elmScene.appendChild(elmCongrats);
  elmScene.appendChild(elmTakenokoImg);
}



// 効果音
// const playSE = () => {
//   document.getElementById('playSE').play();
// }



// のこたん救出用の割り込みミッション
// 一時的にstartMission()をコピペ
const rescueNokotan = () => {
  elmMissionHeadline.setAttribute('visible', 'true');
  elmMissionTargetImg.setAttribute('visible', 'true');
  

  // ミッションタイトル
  elmMissionTitle =  document.createElement('a-text');
  elmMissionTitle.setAttribute('color', 'orange');
  elmMissionTitle.setAttribute('font', fonts.main);
  elmMissionTitle.setAttribute('width', '7');
  elmMissionTitle.setAttribute('negate', 'false');
  elmMissionTitle.setAttribute('align', 'center');
  elmMissionTitle.setAttribute('value', 'のこたんをたすけよう');
  elmMissionTitle.setAttribute('position', '0 0 0.1');
  elmMissionTitle.id = 'mission-title';
  elmTextArea.appendChild(elmMissionTitle);

  elmNextBtn.setAttribute('visible', 'false');
  elmPersonArea.setAttribute('visible', 'false');


  elmMissionTargetImg.setAttribute('src', 'images/target/nokotan.png');
  elmMissionTargetImg.setAttribute('position', '0 0 6');
  elmMissionTargetImg.setAttribute('rotation', '0 -180 0');
  elmMissionTargetImg.setAttribute('visible', 'true');

  // アスペクト比
  elmMissionTargetImg.setAttribute('width', '0.6');
  elmMissionTargetImg.setAttribute('height', '0.75');


  nowSceneData.scenario[nowScenarioNum][2] = null;
}




// New Component (Click event)
AFRAME.registerComponent('cursor-listener', {
  init: function () {
    this.el.addEventListener('click', function () {
      let funcName = this.getAttribute('cursor-listener');
      eval(funcName);
    });
  }
});