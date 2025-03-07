const btnNum=document.querySelectorAll("btn-num");
const btnOp=document.querySelectorAll("btn-op");
const buttonField=document.querySelector("#cal-buttons");
const cursor=document.getElementById("screen-cursor");

let ans;


const screenDisplay=document.getElementById("screen-display");
let checkBracket=0;

let equation="";

buttonField.addEventListener("click",(event)=>{
    let btnPressed=event.target;
    if(btnPressed.classList.contains("btn-equal")){
        calc();
    }
    else if(btnPressed.classList.contains("btn-del")){
        deleteFunc();
    }else if(btnPressed.classList.contains("btn-clear")){
        clear();
    }else if (btnPressed.classList.contains("btn-left-bracket")) {

        if (equation !== "" && (!isNaN(equation.slice(-1)) || equation.slice(-1) === ')')) {
            equation += "*";
        }
        checkBracket++;
        print(btnPressed.innerText);
    } else if (btnPressed.classList.contains("btn-right-bracket")) {

        if (checkBracket > 0 && (!isNaN(equation.slice(-1)) || equation.slice(-1) === ')')) {
            checkBracket--;
            print(btnPressed.innerText);
        } else {
            error();
        }
    } else if(btnPressed.classList.contains("btn-op") && (!isNaN(equation.slice(-1)) || equation.slice(-1)==')')){
            print(btnPressed.innerText);

        
    }else if(btnPressed.classList.contains("btn-power")){
        powerFunc();
    }else if (btnPressed.classList.contains("btn-num")){
        print(btnPressed.innerText);
    }else{
        error();
    }
})

const cursorNew=()=>{
    let newCursor=document.createElement('span');
    newCursor.classList.add("screen-cursor");
    newCursor.innerText='_';
    return newCursor;
}


const print=(val)=>{

    
    if(val=='X'){
        equation+='*';
    }
    else if(val=='%'){
        equation+='/100';
    }
    else if (val == ')' && (checkBracket > 0 && !isNaN(equation.slice(-1)) || equation.slice(-1) === ')')) {
        equation += val;
        checkBracket--;
    }
    else if (val === '(') {
        
        if (equation !== "" && (!isNaN(equation.slice(-1)) || equation.slice(-1) === ')')) {
            equation += "*";
        }
        checkBracket++;
        equation += val;
    } 

        else{
        equation+=val;
    }
    console.log(screenDisplay.innerHTML);
    screenDisplay.innerHTML=equation;
    screenDisplay.appendChild(cursorNew());
    console.log(equation);
    }

const calc=()=>{
    try{
        ans=eval(equation);
        equation=ans+'';
        screenDisplay.innerHTML=ans;
        screenDisplay.appendChild(cursorNew());
        console.log(equation);
    }catch(err){
        screenDisplay.innerHTML="syntax error";

    }
}

const deleteFunc=()=>{
    equation=equation.slice(0,-1);
    screenDisplay.innerHTML=equation;
    screenDisplay.appendChild(cursorNew());
    console.log(equation);
}

const clear=()=>{
    equation="";
    screenDisplay.innerHTML=equation;
    screenDisplay.appendChild(cursorNew());
    console.log(equation);
}
