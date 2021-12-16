import "./spinner.scss";

const Spinner = () => {
    return (
        <>
            <div id='blurredbackground' role='dialog'></div>
            <div className='lds-ellipsis'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </>
    );
};

export default Spinner;
