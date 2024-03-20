<template>
  <footer class="styled-footer">
    <div class="footer-vertical">
      <div class="footer-inner">
        <div
          ref="shortMessageElement"
          class="left-section"
        >
          Find flow.
        </div>
        <div class="right-section">
          <div class="year">
            {{ new Date().getFullYear() }}
          </div>
          <div
            class="clock"
            @click="toggleComment"
          >
            <div class="clock-face">
              <div
                ref="hourHand"
                class="hand hour-hand"
              />
              <div
                ref="minuteHand"
                class="hand min-hand"
              />
              <div
                ref="secondHand"
                class="hand second-hand"
              />
            </div>
          </div>
          <div id="clock-info">
            <span ref="timeZoneElement" />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="extendedMessageActive"
      class="footer-vertical"
    >
      <div class="footer-inner">
        <div class="footer-paragraph">
          <ContentRenderer
            class="markdown-comment"
            :value="parsedMarkdown"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { parseMarkdown } from "#imports"

const parsedMarkdown = await parseMarkdown(
  // "footer-comment",
  `I’m reciting that **quality affects all aspects of my pursuits**.
  I want to **imbue quality** in **everything** I do.
  **This skill develops while doing**.
  Not thinking, not imagining, **_doing_**.
  It is acquired through **learning** and **experimenting**
  and **consistency** and **pacing**.`,
)

const shortMessageElement = ref<HTMLElement>(null)
const timeZoneElement = ref<HTMLElement>(null)
const secondHand = ref<HTMLElement>(null)
const minuteHand = ref<HTMLElement>(null)
const hourHand = ref<HTMLElement>(null)
const intervals = []
const extendedMessageActive = ref(false)
const shortMessage = [
  "Find flow.",
  "Sit with your ambient ambition.",
  "Endure and raise the bar.",
  "Pray at the altar of hard work.",
]

let index = -1

function updateBlurb() {
  index += 1
  index %= shortMessage.length
  shortMessageElement.value.innerText = shortMessage[index]
}

function toggleComment() {
  extendedMessageActive.value = !extendedMessageActive.value
}

function tick() {
  const setTime = () => {
    const now = new Date()

    const seconds = now.getSeconds()
    const secondsDegree = (seconds / 60) * 360 + 90
    secondHand.value.style.transform = `rotate(${secondsDegree}deg)`

    const minutes = now.getMinutes()
    const minutesDegree = (minutes / 60) * 360 + (seconds / 60) * 6 + 90

    minuteHand.value.style.transform = `rotate(${minutesDegree}deg)`

    const hour = now.getHours()
    const hourDegree = (hour / 12) * 360 + (minutes / 60) * 30 + 90

    hourHand.value.style.transform = `rotate(${hourDegree}deg)`

    const timeZoneInfo = `${new Date()
      .toLocaleTimeString(
        [],
        {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        },
      )} ${new Date()
      .toLocaleTimeString(
        "en-us",
        {
          timeZoneName: "short",
        },
      ).split(" ")[2]}`

    timeZoneElement.value.innerText = timeZoneInfo
  }

  intervals.push(setInterval(setTime, 1000))
}

onMounted(() => {
  tick()
  intervals.push(setInterval(updateBlurb, 1000 * 5))
})

onUnmounted(() => {
  intervals.forEach((interval) => clearInterval(interval))
})
</script>

<style lang="scss" scoped>
@use "@/styles/footer";
@use "@/styles/mixins";
@use "@/styles/typography";
@use "@/styles/colors";

.styled-footer {
  flex-direction: column;
  flex-direction: column;
  font-size: typography.font-size(m);
  background: colors.color(background);

  .footer-vertical {
    @include mixins.flex-center;
    width: calc(100% + 0.87rem);
    border-top: 1px solid colors.color(light-background);
    padding: 1em;

    @include mixins.shift-left
  }

  .footer-inner {
    @include mixins.flex-between;
    width: 100%;
    max-width: 848px;

    &.hide {
      display: none;
    }

    .left-section {
      color: colors.color(dark-foreground);
      font-size: 1em;
    }

    .right-section {
      display: inline-flex;
      gap: 1em;
      position: relative;

      .year {
        font-size: 1em;
        font-family: typography.font(sans-serif), sans-serif;
        color: colors.color(dark-foreground);
        font-weight: 500
      }
      align-items: center;
    }

    #clock-info {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 120px;
      transform: translateY(-100%);
      background: rgba(colors.color(background), 0.2);
      color: colors.color(foreground);
      font-weight: 300;
      font-size: 1em;
      padding: 0 1px;
      border-radius: 5px;
      display: inline-flex;
      justify-content: center;
      border: 1px solid;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;

      & > span {
        color: colors.color(light-foreground);
        font-weight: 500;
      }
    }

    .clock {
      height: 1.2em;
      aspect-ratio: 1/1;
      border: 1px solid colors.color(foreground);
      border-radius: 50%;
      position: relative;
      padding: 0;

      &:hover {
        cursor: pointer;
        + #clock-info {
          opacity: 0.8 !important;
        }
      }

      .clock-face {
        position: relative;
        width: 100%;
        height: 100%;
        transform: translateY(-0.3px);

        .hand {
          width: 50%;
          background: colors.color(foreground);
          position: absolute;
          top: 50%;
          transform-origin: 100%;
          transform: rotate(90deg);
          transition: all 0.05s;
          transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
        }

        .hour-hand {
          height: 2px;
          width: 35%;
          left: 15%;
        }

        .min-hand {
          height: 1px;
          width: 35%;
          left: 15%;
        }

        .second-hand {
          height: 1px;
          width: 40%;
          left: 10%;
        }
      }
    }

    .footer-paragraph {
      width: min(100%, 548px);
      color: colors.color(foreground);
      margin: 0 auto;
      padding: 60px 0;

      * {
        font-size: 1em;
      }
    }
  }
}
</style>
