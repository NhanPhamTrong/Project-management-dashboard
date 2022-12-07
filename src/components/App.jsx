import { Navbar } from "./Navbar/Navbar"
import { Dashboard } from "./Dashboard/Dashboard"
import { Projects } from "./Projects/Projects"
import { Calendar } from "./Calendar/Calendar"
import { Profile } from "./Profile/Profile"

export const App = () => {
    const OpenSection = (name) => {
        document.querySelectorAll(".main-container").forEach((item) => {
            if (item.id === name) {
                item.classList.add("active")
            }
            else {
                item.classList.remove("active")
            }
        })
    }

    return (
        <>
            <Navbar OpenSection={OpenSection} />
            <main>
                <Dashboard />
                <Projects />
                <Calendar />
                <Profile />
            </main>
        </>
    )
}