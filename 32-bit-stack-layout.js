//https://www.youtube.com/watch?v=3tUIcmG66y0

//register that always points to the current previous frame pointer
let ebpRegister = 100;
//normal register to hold whatever
let edxRegister = null;
//normal register to hold whatever
let eaxRegister = null;

let stackPointer =100;

//memory for one function call
//each entry in the array represents 4 bytes
//the word size of a 32 bit machine
//we need to unshift because the stack starts at high mememory address
let stackframeForfunc = [
   // 6, //value of b
   // 5, //"value of a
   // 0, //"Return address",
   // 1, //"Previous Frame Pointer"
   // 0, //value of x
   // 0, //value of y

]
//memory for the entire process
let stack =[
    
];
//not sure if this is an accurate representation
// because the stack frames need to refer to each others addresses in the return address
//just put everything into stack

//actual source code
function foo(a,b)
{
    let x,y;
    x = a + b;
    y = a -b;
    bar(a,b);

}
function bar(a,b)
{
    let x,y;
    x = a + b;
    y = a -b;

} 

//foo(5,6)
//create a new stack frame
//let stackframeForFoo = [];
//stack.push(stackframeForFoo);



//how the OS sets up the frame for calling foo
//100 = random high memory address
stack[stackPointer] = (6);
stack[--stackPointer] = (5);
//can the return address be hard coded? its always stackpointer + 2?
stack[--stackPointer] = stackPointer + 2; //how would you not hard code this?
//there could be any number of arguments so how do you know? do you use edp


//the previous frame pointer is pointing the to the PFP of the last function
//there is only one ebp register so it can only hold 1 address at a time
//but if you have 4 function calls you need to know the PFP of all of them
//so the subsequent function stack frame will hold this information
//when you return, it puts the PFP into the ebp register and that stack frame is freed
//so whatever is in ebp goes in here and then you update ebp
stack[--stackPointer] = (ebpRegister);
ebpRegister = 97;
//x
stack[--stackPointer] = (0);
//y
stack[--stackPointer] = (0);

//the os does not know what a or b is, 
//it only knows its an offset from the previous frame pointer
//mov1 12(%ebp), %eax
eaxRegister = stack[ebpRegister+2]; 
//mov1 8(%edbp), %edx
edxRegister = stack[ebpRegister+3]
//add1 %edx, %eax
eaxRegister = eaxRegister + edxRegister;
////mov1 %eax, -8(%ebp)
stack[ebpRegister -1] = eaxRegister;

eaxRegister = stack[ebpRegister+2]; 
edxRegister = stack[ebpRegister+3]
eaxRegister = eaxRegister - edxRegister;
stack[ebpRegister -2] = eaxRegister;

//bar(a,b)

stack[--stackPointer] = (6);
stack[--stackPointer] = (5);
//return address, return address would always be stackpointer + 2 so hard coded?
stack[--stackPointer] = stackPointer + 2;
//PFP
stack[--stackPointer] = (ebpRegister);
ebpRegister = 91;
//x
stack[--stackPointer] = (0);
//y
stack[--stackPointer] = (0);
//add into x
eaxRegister = stack[ebpRegister+2]; 
edxRegister = stack[ebpRegister+3]
eaxRegister = eaxRegister + edxRegister;
stack[ebpRegister -1] = eaxRegister;
//subtract into y
eaxRegister = stack[ebpRegister+2]; 
edxRegister = stack[ebpRegister+3]
eaxRegister = eaxRegister -edxRegister;
stack[ebpRegister -2] = eaxRegister;

//bar has completed and returned

//clear the stack frame
//how does cpu know how much memory to clear
//epbregister always has the offset address
//you can find the return address with this offset
//but how do you clearn out the PFP before you set it back in the ebpRegister
// i can't figure this out, do you temp store it somewhere?

//stack point gets set back to return address
stackPointer = stack[ebpRegister +1];


//restore foo previous frame point
ebpRegister = stack[ebpRegister];
//these can be hard coded somehow because they are always the 
//in these 2 positions in the stack from
stack[91] = null;
stack[92] = null;







//assembly
//mov1 12(%ebp), %eax
//mov1 8(%edbp), %edx
//add1 %edx, %eax
//mov1 %eax, -8(%ebp)
 

 

