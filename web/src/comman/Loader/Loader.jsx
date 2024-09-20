import './Loader.css'

const Loader = (props) => {
    return (
        <div className={`loader-background ${!props.show?'hidden-element':''}`}>
            <div className={`loading-animation-item loading-animation-item-1`}>

            </div>
            <div className={`loading-animation-item loading-animation-item-2`}>

            </div>
            <div className={`loading-animation-item loading-animation-item-3`}>

            </div>
        </div>
    )
}

export default Loader