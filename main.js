
/* 한 페이지씩 이동*/
// 지금의 스크롤 위치를 담을 변수
var currentScroll = 0;
// 에니메이션 효과를 주기위한 function 명 선언
var tim;
window.onload = function () {
    /* Div Class 명 */
    // box클래스 추출
    var box = document.getElementsByClassName('box');
    // box클래스 개수만큼 실행
    for (var i = 0; i < box.length; i++) {
        // box 에 각각 마우스 휠 감지
        // 휠감지
        box[i].addEventListener("mousewheel", MouseWheelHandler, false);
        //box[i].onmousewheel = function(){MouseWheelHandler};
        // firefox 용 휠처리
        box[i].addEventListener("DOMMouseScroll", MouseWheelHandler, true);
    }
}
function MouseWheelHandler(e) {
    // 스크롤 취소시킴(이걸 안할경우 도중에 명령을 받아 화면이 덜덜 거릴수 있음)
    e.preventDefault();
    // 휠값처리
    var delta = 0;
    if (!e) {e = window.e;}
    if (e.wheelDelta) {
        delta = e.wheelDelta / 120;
        if (window.opera) {delta = -delta;}
    }
    else if (e.detail){
        delta = -e.detail / 3;
    }

    // 여러개일경우 다른 selector 을 확인하기위한 상위 dom 으로 이동
    var p = e.target.parentElement;
    // 몇번째 dom 인지 저장
    var index = Array.prototype.indexOf.call(p.children, e.target);
    // 같은 위치의 돔목록 을 저장
    var boxArr = e.target.parentElement.children;
    // 지금의 스크롤 위치 저장
    currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    // 다음위치의 좌표(기본이므로 현재의 Y 좌표 저장)
    var NextTarget = currentScroll;
    // 마우스휠 위로
    if (delta > 0) {
        // 맨처음 지점 제외
        if (index > 0) {
            // 이전 dom 의 index 번호
            var no = (index - 1);
            // 좌표위치 저장
            NextTarget = boxArr[no].offsetTop;
        }
    }
    // 마우스휠 아래로
    else if (delta < 0)
    {
        // 맨마지막 지점 제외
        if (index < boxArr.length - 1) {
            // 다음 dom 의 index 번호
            var no = (index + 1);
            // 좌표위치 저장
            NextTarget = boxArr[no].offsetTop;
        }
    }
    // 애니메이션
    // 필요없으면 바로 window.scrollTo(0, NextTarget);
    // 에니메이션 초기화
    clearInterval(tim);
    // 애니메이션 실행
    tim = setInterval(tran, 1);
    // 애니메이션 function
    function tran() {
        // 이동속도 숫자가 작아질수록 느려짐
        var speed = 5;
        // 현재 스크롤과 이동후 스크롤이 같으면 정지시킨다 
        if (currentScroll == NextTarget) {
            clearInterval(tran);
        } else {
            // 스크롤을 위로 올릴 경우
            if (currentScroll - speed > NextTarget)
            {
                currentScroll -= speed;
            }
            // 스크롤을 내일 경우
            else if (currentScroll + speed < NextTarget)
            {
                currentScroll += speed;
            }
            // 스크롤이 속도로 지정된 변수보다 작을 경우 강제적으로 맞춰준다
            else
            {
                currentScroll = NextTarget;
            }
            // 스크롤위치 변경
            window.scrollTo(0, currentScroll);
        }
    }
}
/*한 페이지씩 이동 끝*/

/*상단 로고 canvas그리기*/
var canvas = document.getElementById("canvas");
if(canvas.getContext){
    var ctx = canvas.getContext("2d");

    var img = new Image();
    img.onload = function(){
        ctx.drawImage(img, 10, 10);
    }
    img.src = 'logo.png';
    
    ctx.font = "italic bold 15px Arial, sans-serif";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillText("KimJaegwan",15,125);
}

/* 현재 시간 (실시간) */
var clockTarget = document.getElementById("clock");

function clock() {
    var date = new Date();
    // date Object를 받아오고 
    var month = date.getMonth();
    // 달을 받아옵니다 
    var clockDate = date.getDate();
    // 몇일인지 받아옵니다 
    var day = date.getDay();
    // 요일을 받아옵니다. 
    var week = ['일', '월', '화', '수', '목', '금', '토'];
    // 요일은 숫자형태로 리턴되기때문에 미리 배열을 만듭니다. 
    var hours = date.getHours();
    // 시간을 받아오고 
    var minutes = date.getMinutes();
    // 분도 받아옵니다.
    var seconds = date.getSeconds();
    // 초까지 받아온후 
    clockTarget .innerText = `${month+1}월 ${clockDate}일 ${week[day]}요일` +
    `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes }`  : minutes }:${seconds < 10 ? `0${seconds }`  : seconds }`;
    // 월은 0부터 1월이기때문에 +1일을 해주고 
    // 시간 분 초는 한자리수이면 시계가 어색해보일까봐 10보다 작으면 앞에0을 붙혀주는 작업을 3항연산으로 했습니다. 
}

function init() {
clock();
// 최초에 함수를 한번 실행시켜주고 
setInterval(clock, 1000);
// setInterval이라는 함수로 매초마다 실행을 해줍니다.
// setInterval은 첫번째 파라메터는 함수이고 두번째는 시간인데 밀리초단위로 받습니다. 1000 = 1초 
}

init();

function up(){
    let rollUpBtn = document.getElementById('rollUp');

    const scroll = () => {
        if (window.scrollY !== 0) {
            setTimeout(() => {
                window.scrollTo(0, window.scrollY - 50);
                scroll();
            }, 10);
        }
    }
    
    rollUpBtn.addEventListener('click', scroll);
}

