  /* 세자리 마다 숫자 찍기 펑션 */
function getNumber(obj){
        
  var num01;
  var num02;
  num01 = obj.value;
  num02 = num01.replace(/\D/g,""); 
                                   
  num01 = setComma(num02); 
  obj.value =  num01;

}
function setComma(n) {
  var reg = /(^[+-]?\d+)(\d{3})/;   
  n += '';                              
  while (reg.test(n)) {
     n = n.replace(reg, '$1' + ',' + '$2');
  }         
  return n;
}

function getblur(n) {
  n.value = `${n.value} 원`
} 

function getfocus(n) {
  let data = n.value
  n.value = data.replace(" 원", "")
}

/* 업로드 펑션 */
function change_btn() {
  let data = document.querySelector(".img_count_text")
  let fileName = document.querySelector(".file_input").files
  let files = document.querySelector(".file_input").files.length

  if(files > 5 ) {
    return alert("이미지 파일은 5개 이상 업로드 할 수 없습니다.")
  }
  
  for (let i=0; i < files; i++) {
    console.log(fileName[i].name)
  }
  
  data.innerText = `${files}/5`
}