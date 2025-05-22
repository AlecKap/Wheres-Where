import confetti from 'canvas-confetti';

let rainInterval: any = null;


const shape1 = confetti.shapeFromText({ text: '🌍' });
const shape2 = confetti.shapeFromText({ text: ' 🎈' });
const shape3 = confetti.shapeFromText({ text: '🏆' });
const winshapes = [shape1, shape2, shape3];

const lose1 = confetti.shapeFromText({ text: '💩' });
const lose2 = confetti.shapeFromText({ text: '💩 ' });
const lose3 = confetti.shapeFromText({ text: '💩' });
const loseShapes = [lose1, lose2, lose3];
let shapes: any[];
export const startConfettiRain = (result: any) => {
  if (result === 'lose') {
    shapes = loseShapes;
  }
  else{ shapes = winshapes}
  //initial confetti 
  confetti({
        shapes,
        scalar: 2.5,
        particleCount: 500,
        spread: 900,
        gravity: 0.36,
        startVelocity: 60,
        ticks: 600,
        
      });
  //the rain
  if (rainInterval) return;

  for (let i = 0; i < 10; i++) {
    confetti({
      shapes,
      scalar: 2.5,
      particleCount: 5,
      spread: 40,
      gravity: 0.35,
      startVelocity: 30,
      ticks: 600,
      origin: {
        x: i / 10 + Math.random() * 0.05,
        y: 0
      }
    });
  }

  // Start interval rain
  rainInterval = setInterval(() => {
    for (let i = 0; i < 10; i++) {
      confetti({
        shapes,
        scalar: 2.5,
        particleCount: 5,
        spread: 40,
        gravity: 0.35,
        startVelocity: 30,
        ticks: 500,
        origin: {
          x: i / 10 + Math.random() * 0.05,
          y: 0
        }
      });
    }
  }, 500);
};

export const stopConfettiRain = () => {
  if (rainInterval) {
    clearInterval(rainInterval);
    rainInterval = null;
  }

  const canvas = document.querySelector('canvas');
  if (canvas) {
    canvas.style.transition = 'opacity 1s ease';
    canvas.style.opacity = '0';
    setTimeout(() => {
      canvas.remove();
    }, 1000);
  }
};
