function Clock(props) {
    return <span className="clock">{props.hours < 10 ? 0 : ""}{props.hours}:{props.minutes < 10 ? 0 : ""}{props.minutes}:{props.seconds < 10 ? 0 : ""}{props.seconds}</span>;
}

export default Clock;