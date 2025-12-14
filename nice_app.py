import streamlit as st
import random

st.set_page_config(page_title="Santa's Naughty or Nice List 🎅")

st.title("🎄 Santa's Naughty or Nice List 🎄")
st.write("Enter your name and let the code decide your fate...")

name = st.text_input("Your Name")

# Pre-decided cases (optional)
pre_decided = {
    "Mansi": ("Nice", "Because you coded this masterpiece 🎁"),
    "Santa": ("Nice", "Because… obviously 🎅"),
}

reasons_nice = [
    "You helped someone without being asked.",
    "Your commits were clean and meaningful.",
    "You survived meetings with grace.",
    "You spread good vibes all year ✨"
]

reasons_naughty = [
    "You forgot to push your code.",
    "You said 'I'll do it later' too many times.",
    "You blamed the bug on the system 😈",
    "Too many snacks during work hours."
]

if st.button("Check Santa’s List"):
    if name.strip() == "":
        st.warning("Santa needs a name!")
    else:
        # Check if name is pre-decided
        if name in pre_decided:
            status, reason = pre_decided[name]
        else:
            status = random.choice(["Nice", "Naughty"])
            reason = random.choice(
                reasons_nice if status == "Nice" else reasons_naughty
            )

        if status == "Nice":
            st.success(f"🎁 {name}, you are on the NICE list!")
        else:
            st.error(f"🔥 {name}, you are on the NAUGHTY list!")

        st.write(f"**Why?** {reason}")
