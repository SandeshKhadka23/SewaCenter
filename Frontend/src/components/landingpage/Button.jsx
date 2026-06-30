
function Button({ variant, text, onClick }) {
    const style = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 ",
        secondary: "bg-transparent text-slate-600 font-medium text-sm hover:bg-blue-50 ",
        outline: " text-slate-600 font-medum font inherit bg-transparent text-sm text--600 hover:bg-blue-50 "
    };
    const commonStyle =
        "px-4 py-2 rounded-lg cursor-pointer";
    return (

        <>

            <button className={`${style[variant]} ${commonStyle} `} onClick={onClick}>{text}</button>
        </>
    )
}
export default Button;