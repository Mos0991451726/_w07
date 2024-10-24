import './Home.css';

function Home() {
    return ( 
        <div className='home-container'>
            <br />
            <div>
                <h1 className='badge bg-dark'>Introduce Yourself</h1>
            </div>
            
            <div className="content">
                <p>
                    ชื่อ - นามสกุล : นายภูวนาท ศรุตติ์ตานนทร์ <br />
                    กำลังศึกษาอยู่ที่ : มหาวิทยาลัยศรีปทุม ชั้นปีที่ 2 <br />
                    คณะ : เทคโนโลยีสารสนเทศ <br />
                    สาขา : วิทยาการคอมพิวเตอร์และพัฒนาซอฟต์แวร์ <br />
                    อายุ : 21 ปี <br />
                    อาชีพ : นักศึกษา<br />
                    รหัสนักศึกษา : 66065761 <br />
                    หมายเลขโทรศัพท์ : 0991451726 <br />
                    อีเมล : puvanart.sar@gmail.com <br />
                    งานอดิเรก : ออกแบบและพัฒนาเว็บไซต์ / อ่านการ์ตูน / นอน
                </p>
                <img src="stdempimg.jpg" alt="Profile" className="profile-image" />
            </div>
        </div>
     );
}

export default Home;
