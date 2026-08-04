const Separator = () => {
    return (
        <div className='relative h-5 w-full overflow-hidden bg-section-beta sm:h-6 xl:h-25' aria-hidden="true">
            <svg
                className='absolute inset-0 h-full w-full'
                viewBox='0 0 1440 100'
                preserveAspectRatio='none'
                focusable='false'
            >
                <path
                    className='fill-section-alpha'
                    d='M0 35C240 -5 480 -5 720 35C960 75 1200 75 1440 35V65C1200 105 960 105 720 65C480 25 240 25 0 65Z'
                />
                {/* <path
                    d='M0 35C240 -5 480 -5 720 35C960 75 1200 75 1440 35'
                    fill='none'
                    stroke='#d7505f'
                    strokeWidth='1'
                    opacity='0.22'
                    filter='blur(0.5px)'
                    transform='translate(0 1)'
                />
                <path
                    d='M0 65C240 25 480 25 720 65C960 105 1200 105 1440 65'
                    fill='none'
                    stroke='#d7505f'
                    strokeWidth='1'
                    opacity='0.22'
                    filter='blur(0.5px)'
                    transform='translate(0 -1)'
                /> */}
                <path
                    d='M0 35C240 -5 480 -5 720 35C960 75 1200 75 1440 35'
                    fill='none'
                    stroke='#a0a0a0'
                    strokeWidth='0.3'
                />
                <path
                    d='M0 65C240 25 480 25 720 65C960 105 1200 105 1440 65'
                    fill='none'
                    stroke='#a0a0a0'
                    strokeWidth='0.2'
                />
            </svg>
        </div>
    )
}

export default Separator