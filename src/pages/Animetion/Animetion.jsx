import { useState, useEffect, useRef } from 'react';

import './Animetion.css'

function Animetion() {

    // ตัวแปรเปลี่ยนแปลง
    const diameter = 80; //ขนาดบอล
    const fieldWidth = 750; //ความยาวสนาม
    const fieldHeight = 550; //ความสู้สนาม

    // 1 วินาที = 1000 มิลลิวินาที frames = ภาพที่ต้องการให้แสดงใน 1 วินาที  
    const frames = 24;
    const fps = 1000 / frames

    const ballSpeedX = 5; //ความเร็วแกน x บอล
    const ballSpeedY = 5; //ความเร็วแกน f บอล

    // ตัวแปรคำนวนขอบสนาม
    const maxWidth = fieldWidth - diameter - 2; //ขอบสนามกว้าง
    const maxHeight = fieldHeight - diameter - 2; //ขอบสนามสูง

    // ตัวแปรคำนวนตำแหน่งบอล
    const [x, setX] = useState((fieldWidth / 2) - (diameter / 2))
    const [y, setY] = useState((fieldHeight / 2) - (diameter / 2))

    //ลาสคลิก
    const [lastClick, setLastClick] = useState('None')
    //สถานะบอล
    const [running, setRunning] = useState(false)

    const [position, setPosition] = useState({
        x: (fieldWidth / 2) - (diameter / 2),
        y: (fieldHeight / 2) - (diameter / 2)
    });

    // ตัวแปรบูลีน
    const goX = useRef(true);
    const goY = useRef(true);

    // กำหนดเริ่มรอบ
    const deg = useRef(45);
    const speed = useRef(5);
    const tid = useRef(1);

    //เข้าถึง DOM(บอล),(สนาม) โดยตรง
    const ballRef = useRef(null)
    const fieldRef = useRef(null)

    //เว็ปโหลดครั้งแรก
    useEffect(() => {
        update()
        ballRef.current.style.backgroundColor = 'white'
    }, [])

    useEffect(() => {
        if (running) {
            const interval = setInterval(() => {
                calBall();
            }, fps)
            return () => clearInterval(interval)
        }
    }, [running, position])

    const calBall = () => {
        let { x, y } = position;

        if (goX.current) {
            x += ballSpeedX;
            if (x >= maxWidth) {
                x = maxWidth - (x - maxWidth);
                goX.current = false;
                random()
            }
        }
        else {
            x -= ballSpeedX;
            if (x <= 0) {
                x = -x
                goX.current = true;
                random()
            }
        }

        if (goY.current) {
            y += ballSpeedY;
            if (y >= maxHeight) {
                y = maxHeight - (y - maxHeight);
                goY.current = false;
                random()
            }
        } else {
            y -= ballSpeedY;
            if (y <= 0) {
                y = -y
                goY.current = true;
                random()
            }
        }
        deg.current += speed.current;
        setPosition({ x, y });
        update()

    }

    const random = () => {
        tid.current = Math.floor(Math.random() * (2)) + 1;
        speed.current = Math.floor(Math.random() * (10)) + 1;
        if (tid.current == 1) {
            speed.current *= 1;
        } else {
            speed.current *= -1
        }
        console.log(speed.current);

    }


    const update = () => {
        // ขนาดสนาม
        fieldRef.current.style.width = fieldWidth + 'px';
        fieldRef.current.style.height = fieldHeight + 'px';

        // ขนาดบอล
        ballRef.current.style.width = diameter + 'px';
        ballRef.current.style.height = diameter + 'px';

        // ตำแหน่งบอลเริ่มต้น
        ballRef.current.style.left = position.x + 'px';
        ballRef.current.style.top = position.y + 'px';

        //การหมุน
        ballRef.current.style.transform = 'rotate(' + deg.current + 'deg)';

    }

    return (
        <div className='animetion'>
            <div id="container">
                <div id="field" ref={fieldRef}>
                    <div id="ball" ref={ballRef}>

                    </div>
                </div>

                <div id="menu">
                    <button id="run" className={"btn " + (running === false ? "btn-success" : "btn-danger")} onClick={() => {
                        setRunning(!running)
                    }}><i className={"bi " + (running === false ? "bi-play-fill" : "bi-pause-fill")}></i> {running === false ? 'Run' : 'Pause'}
                    </button>
                    <span id='menuR' style={{ padding: '0' }}>
                        <button id="None" className={"btn " + (lastClick === '' || lastClick === 'None' ? "btn-outline-secondary btn-1 active" : 'btn-outline-secondary btn-1 ')}
                            onClick={() => {
                                setLastClick('None')
                                ballRef.current.style.backgroundColor = 'white'
                                ballRef.current.style.backgroundImage = 'none'
                            }}>
                            None
                        </button>
                        <button id="Basketball" className={"btn " + (lastClick === 'Basketball' ? "btn-outline-primary btn-1 active" : 'btn-outline-primary btn-1 ')}
                            onClick={() => {
                                setLastClick('Basketball')
                                ballRef.current.style.backgroundImage = 'url(./basketball.png)'
                                ballRef.current.style.backgroundSize = '150%';
                            }}>
                            Basketball
                        </button>
                        <button id="Football" className={"btn " + (lastClick === 'Football' ? "btn-outline-primary btn-1 active" : 'btn-outline-primary btn-1 ')}
                            onClick={() => {
                                setLastClick('Football')
                                ballRef.current.style.backgroundImage = 'url(./football.png)'
                                ballRef.current.style.backgroundSize = '150%';
                            }}>
                            Football
                        </button>
                        <button id="Volleyball" className={"btn " + (lastClick === 'Volleyball' ? "btn-outline-primary btn-1 active" : 'btn-outline-primary btn-1 ')}
                            onClick={() => {
                                setLastClick('Volleyball')
                                ballRef.current.style.backgroundImage = 'url(./volleyball.png)'
                                ballRef.current.style.backgroundSize = '200%';
                            }}>
                            Volleyball
                        </button>
                        <button id="Human" className={"btn " + (lastClick === 'Human' ? "btn-outline-primary btn-1 active" : 'btn-outline-primary btn-1 ')}
                            onClick={() => {
                                setLastClick('Human')
                                ballRef.current.style.backgroundImage = 'url(./stdempimg.jpg)'
                                ballRef.current.style.backgroundSize = '100%';
                            }}>
                            Human
                        </button>
                        <button id="Cartoon" className={"btn " + (lastClick === 'Cartoon' ? "btn-outline-primary btn-1 active" : 'btn-outline-primary btn-1 ')}
                            onClick={() => {
                                setLastClick('Cartoon')
                                ballRef.current.style.backgroundImage = 'url(./vn.jpg)'
                                ballRef.current.style.backgroundSize = '200%';
                            }}>
                            Cartoon
                        </button>
                        <button id="Logo" className={"btn " + (lastClick === 'Logo' ? "btn-outline-primary btn-1 active" : 'btn-outline-primary btn-1 ')}
                            onClick={() => {
                                setLastClick('Logo')
                                ballRef.current.style.backgroundImage = 'url(./v2.jpg)'
                                ballRef.current.style.backgroundSize = '120%';
                            }}>
                            Logo
                        </button>
                    </span>
                </div>

            </div>
        </div >
    )
}
export default Animetion;