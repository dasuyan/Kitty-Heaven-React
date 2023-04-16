import AnalogClock from 'analog-clock-react';
let options = {
    width: "150px",
    border: true,
    borderColor: "#2e2e2e",
    baseColor: "#8d17d2",
    centerColor: "#ff006a",
    centerBorderColor: "#ffffff",
    handColors: {
        second: "#e0217e",
        minute: "#d9ca7c",
        hour: "#08e8c6"
    }
};
function Header() {
    return (
        <header>
            <AnalogClock {...options} />
            <h1>Kitty Heaven</h1>
            <img src="/img/logo.png" alt="Kitty Heaven Logo" />
        </header>
    )
}

export default Header