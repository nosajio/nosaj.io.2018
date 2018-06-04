import Two from 'two.js';

const el = el => document.querySelector(el);

const getLogo = () => el('.nosaj-logo');


const addLogoShape = stage => {
  const logoEl = getLogo();
  const logoShape = stage.interpret(logoEl).center();
  return logoShape;
}

const rc = () => Math.random() * 255;

const getFullScreenScale = (a, stage) => {
  const size = a.getBoundingClientRect();
  return stage.width / size.width;
}

const drawLetter = (letter, stage) => {
  // Create a shape to travel along the path
  const traveller = stage.makeCircle(0, 0, 2);
  traveller.fill = `rgb(${rc()}, ${rc()}, ${rc()})`;
  traveller.noStroke();
  // letter.stroke = '#53585F';

  letter.getPointAt(Math.random(), traveller.translation);
  traveller.translation.addSelf(letter.translation);
  return [letter, traveller];
}

const animateNosajLogo = stage => {
  stage.bind('update', frame => {
    stage.clear();
    
    const logoAnimGroup = addLogoShape(stage).center();
    logoAnimGroup.noStroke();

    logoAnimGroup.translation.set(stage.width/2, stage.height/2);

    const N = logoAnimGroup.children[0].children[0];
    const O = logoAnimGroup.children[0].children[1];
    const SA = logoAnimGroup.children[0].children[2];
    const J = logoAnimGroup.children[0].children[3];

    const letters = [N, O, SA, J];
    const dotsGroup = stage.makeGroup().center();

    letters.forEach(l => {
      dotsGroup.add(...drawLetter(l, stage));
    });

    dotsGroup.translation.set(stage.width / 2, stage.height / 2);
    // dotsGroup.scale = getFullScreenScale(logoAnimGroup, stage);
  });
  stage.play();
}


// For real implementation starts here



const nosajLogoArt = () => {
  const stageEl = el('.opener-art');

  // Setup the Two.js scene
  const stageBoundingClientRect = stageEl.getBoundingClientRect();
  const stage = new Two({
    width: stageBoundingClientRect.width,
    height: stageBoundingClientRect.height,
    type: Two.Types.canvas,
  });
  stage.appendTo(stageEl);

  
  // logo.children.forEach(ch => {
  //   ch.children.forEach(s => {
  //     // console.log(s);
      
  //     s.vertices.forEach(a => {
  //       // console.log(a);
        
  //     });
  //   });
  // });
  
  // Animate the logo
  // animateNosajLogo(stage);
  // stage.update();
}

const opener = () => {
  nosajLogoArt();
}

export default opener