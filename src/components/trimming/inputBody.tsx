

const InputBody = ({setIsUrlAddedPass}) => {
    return(
    <div className='urlInputContainer'>
        <h3>Insert Video URL</h3>
        <input type="text" placeholder="Paste URL here" />
        <button onClick={() => setIsUrlAddedPass(true)} >Clip this</button>
    </div>
    )
}

export default InputBody;