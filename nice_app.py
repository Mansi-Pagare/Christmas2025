import streamlit as st
import random

# Page setup
st.set_page_config(page_title="Santa's Naughty or Nice List 🎅", page_icon="🎄")

# Title and description
st.title("🎄🎅 Santa's Naughty or Nice List🎄")
st.write("Enter your name and let the code decide your fate... 🦌❄️")

# Input box
name = st.text_input("Your Name")

# Full pre-decided list
pre_decided = {
    "Mansi": ("Nice", "obviously coded this masterpiece like a wizard."),
    "Bruce": ("Naughty", "who goes around kidnapping people's dogs? Santa's concerned!"),
    "Shannon": ("Nice", "spreads festive cheer so effortlessly, it should come with a warning label: “Highly contagious happiness ahead!”"),
    "Loretta": ("Naughty", "loves mixing up names… especially when a smoking hot wife is sitting right there."),
    "Cole": ("Naughty", "stops terrifying people around corners."),
    "Adrianna": ("Nice", "brings sparkle, warmth, and the kind of vibe that makes everyone feel like it’s a holiday party all year."),
    "Ashley": ("Naughty", "there can only be one “nice” in the house, and it’s Sadie, so… better luck next year."),
    "Mandi": ("Nice", "tops the board effortlessly… no explanation required, just legendary energy."),
    "Mark": ("Naughty", "has all the paparazzi, yet still no party? Santa is disappointed."),
    "Pam": ("Nice", "the sweetest person ever, basically a walking hug and a cookie all in one."),
    "Don": ("Naughty", "Santa doesn’t fully trust anyone with Slytherin vibes."),
    "Atiana": ("Naughty", "do we even need a reason? You’re probably plotting some holiday mischief this very second."),
    "Sheralyn": ("Naughty", "like a mischievous elf on caffeine, but manages to make it hilarious."),
    "Kristi": ("Nice", "Hello Professor Kristi, your brilliance and charm easily make the nice list."),
    "Steph": ("Nice", "the most helpful elf alive, saving the day before anyone even notices a problem."),
    "Jason": ("Nice", "keeps the spirits of AEAT alive, making the list an easy choice.")
}

# Generic messages
generic_nice = [
    "always going above and beyond, like a holiday hero in disguise.",
    "brings joy and good vibes so naturally, it’s basically a superpower.",
    "spreads warmth, laughter, and a little sparkle wherever you go.",
    "You spread good vibes all year"
]

generic_naughty = [
    "probably plotting a holiday prank as we speak.",
    "made Santa double-check his list.",
    "You left half-finished snacks in mysterious places."
]

# Check button
if st.button("Check Santa’s List"):
    if name.strip() == "":
        st.warning("Santa needs a name!")
    else:
        # Pre-decided or random
        if name in pre_decided:
            status, reason = pre_decided[name]
        else:
            status = random.choice(["Nice", "Naughty"])
            reason = random.choice(generic_nice if status == "Nice" else generic_naughty)

        # Display result
        if status == "Nice":
            st.success(f"🎁 {name}, you are on the NICE list!")
        else:
            st.error(f"🔥 {name}, you are on the NAUGHTY list!")

        st.write(f"**Why?** {reason}")

# Snow effect and festive caption
st.snow()
st.caption("🎄 Powered by Python & Holiday Spirit")



