import { TypeAnimation } from 'react-type-animation';

export const CodeBlock = ({data,background}) => {
    return (
        // background: ;

        <div className='relative codeBlockBlur'>
            <div className= {`absolute `+background}></div>
            <div className='flex min-h-fit border-richblack-600 border-2 py-3'>
                <div className='text-richblack-400 px-4'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div>
                <TypeAnimation 
                sequence={[data, 1000, ""]}
                cursor={true}
                repeat={Infinity}
                style={{
                whiteSpace: "pre-line",
                display: "block",
                }}
                omitDeletionAnimation={true}
                />
            </div>
        </div>
        </div>
    );
  };