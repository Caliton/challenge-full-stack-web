<template>
  <div class="mobile">
    <div class="mobile-screen">
      <router-view />

      <div class="bottom-nav">
        <router-link
          class="case-icon"
          :key="i.link"
          v-for="i in modules"
          :class="$route.name === i.link ? 'active' : 'inactive'"
          tag="div"
          :to="{ name: i.link }"
        >
          <div class="icon-bg"></div>

          <v-icon class="icon" color="grey">{{ i.icon }}</v-icon>

          <span class="icon-title">
            {{ $t(i.label) }}
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { modules } from '../../enumerators/modules.js'

export default {
  name: 'BottomBar',

  data: () => ({
    activeIcon: 1,
    modules
  })
}
</script>

<style lang="scss" scoped>
$blue: #3e44c7;

.mobile {
  width: 100vw;
  height: 100vh;
  margin-bottom: 0px;
}

.mobile-screen {
  height: 100%;
  width: 100%;
  // background-color: #eeeeee;
  position: inherit;
}

/* BOTTOM NAVIGATION */
.mobile-screen .bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 62px;
  background-color: #ffffff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .case-icon {
    position: relative;
    background-color: #ffffff;
    display: grid;
    place-items: center;
    width: 58px;
    height: 58px;
    border-radius: 100%;

    &::before,
    &::after {
      content: '';
      position: absolute;
      height: 22px;
      width: 28px;
      top: 6px;
      z-index: -2;
    }

    &::before {
      left: -22px;
      border-radius: 0 0 28px 0;
      box-shadow: 10px 8px 0 0 #ffffff;
    }

    &::after {
      right: -22px;
      border-radius: 0 0 0 28px;
      box-shadow: -10px 8px 0 0 #ffffff;
    }

    &.active {
      animation: bounce 600ms both;

      .icon-bg {
        opacity: 1;
      }

      .icon {
        filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(2%)
          hue-rotate(101deg) brightness(105%) contrast(101%);
      }

      .icon-title {
        animation: bounce-in 400ms;
      }
    }

    &.inactive {
      animation: bounce-reverse 400ms both;

      .icon-bg {
        opacity: 0;
      }

      .icon-title {
        animation: bounce-in-reverse 400ms both;
      }
    }
  }

  .icon-bg {
    background-image: linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);
    border-radius: 100%;
    height: 48px;
    width: 48px;
    position: absolute;
    transition: all 200ms ease;
  }

  .icon {
    width: 22px;
    flex: none;
    z-index: 0;
    transition: all 200ms ease;
  }

  .icon-title {
    text-align: center;
    font-size: 11px;
    color: $blue;
    position: absolute;
    bottom: -16px;
  }
}

@keyframes bounce {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-30px);
  }

  100% {
    transform: translateY(-28px);
  }
}

@keyframes bounce-reverse {
  0% {
    transform: translateY(-28px);
  }

  50% {
    transform: translateY(-30px);
  }

  100% {
    transform: translateY(0px);
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes bounce-in-reverse {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}
</style>
