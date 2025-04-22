function Clock(props) {
    return <span className="clock">{props.minutes < 10 ? 0 : ""}{props.minutes}:{props.seconds < 10 ? 0 : ""}{props.seconds}</span>;
}

export default Clock;