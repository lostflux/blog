<template>
  <StyledMenu>
    <!-- <body :class="menuOpen ? 'blur' : ''" /> -->
    <div ref="wrapperRef" class="menu">
      <StyledMenuButton
        @click="toggleMenu"
        :aria-expanded="menuOpen ? 'true' : 'false'"
        :aria-label="menuOpen ? 'Close Menu' : 'Open Menu'"
        ref="buttonRef"
      >
        <!-- <div class="ham-box">
          <div class="ham-box-inner" />
        </div> -->
        <!-- <a 
          class="menu-button"
          target="_blank"
          rel="noopener noreferrer"
          @click="toggleMenu"
        >
          {{ menuOpen ? "&#x3c" : "&#x3e" }}
        </a> -->
        
      </StyledMenuButton>

      <StyledSideBar
        :menuOpen="menuOpen"
        :aria-hidden="!menuOpen"
        :tabIndex="menuOpen ? 1 : -1"
        v-show="menuOpen"
      >
        <nav ref="navRef">
          <ol>
            <li
              v-for="(item, i) in navLinks.otherLinks"
              :key="i"
            >
              <NuxtLink
                :href="item.url"
                :aria-label="item.name"
                @click="toggleMenu"
              >
                {{ item.name }}
              </NuxtLink>
            </li>

          </ol>
        </nav>
      </StyledSideBar>

    </div>
  </StyledMenu>

</template>

<script lang="ts" setup>

import { KEY_CODES } from "~/src/utils";
import { navLinks } from "~/src/config";

const menuOpen = ref(false);

const buttonRef = ref(null);
const navRef = ref(null);
const menuFocusableElements = ref(null);
const firstFocusableElement = ref(null);
const lastFocusableElement = ref(null);



const handleBackwardTab = (e) => {
  if (document.activeElement === firstFocusableElement.value) {
    e.preventDefault();
    lastFocusableElement.value.focus();
  }
};

const handleForwardTab = (e) => {
  if (document.activeElement === lastFocusableElement.value) {
    e.preventDefault();
    firstFocusableElement.value.focus();
  }
};

const handleEscape = (e) => {
  if (e.key === "Escape") {
    closeMenu();
    buttonRef.value.focus();
    e.preventDefault();
  }
};

const handleKey = (e) => {
  // const isTabPressed = e.key === "Tab" || e.keyCode === 9;
  // const isEscapePressed = e.key === KEY_CODES.ESCAPE || e.key === KEY_CODES.ESCAPE_IE11;
  // if (isTabPressed) {
  //   e.preventDefault(0);
  //   // if (e.shiftKey) {
  //   //   handleBackwardTab(e);
  //   // } else {
  //   //   handleForwardTab(e);
  //   // }
  // } else if (isEscapePressed) {
  //   handleEscape(e);
  // }
  switch (e.key) {
    case KEY_CODES.ESCAPE :
    case KEY_CODES.ESCAPE_IE11 : {
      handleEscape(e);
      break;
    }

    case KEY_CODES.TAB : {
      if (e.shiftKey) {
        handleBackwardTab(e);
      } else {
        handleForwardTab(e);
      }
      break;
    }
    default : { break; }
  }
}



// const stopHandleKeys = watchEffect(() => {
//   document.addEventListener("handle-keys", handleKey);
//   return () => {
//     document.removeEventListener("handle-keys", handleKey);
//   };
// });

const wrapperRef = ref(null);

onMounted(
  () => {
    // console.log("mount start");
    const links = navRef.value?.querySelectorAll('a');
    // console.log(`links found: ${links.length}`);
    menuFocusableElements.value = [
      buttonRef.value,
      ...links
    ];
    // console.log(`menuFocusableElements: ${menuFocusableElements.value.length}`);
    // console.log("menuFocusableElements.value: ", menuFocusableElements.value);
    firstFocusableElement.value = menuFocusableElements[0] || null;
    lastFocusableElement.value = 
      menuFocusableElements[menuFocusableElements.length - 1] || null;

    // console.log(`
    //   firstFocusableElement.value: ${firstFocusableElement.value}
    //   lastFocusableElement.value: ${lastFocusableElement.value}
    // `);

    document.addEventListener("handle-keys", handleKey);
    // console.log("mount end");
  }

);


onUnmounted(
  () => {
    document.removeEventListener("handle-keys", handleKey);
  }
);

const closeMenu = () => {
  console.log(`Menu Closed!`);
  menuOpen.value = false;
}

const openMenu = () => {
  console.log(`Menu Opened!`);
  menuOpen.value = true;
  console.log()
  // onClickOutside(wrapperRef, closeMenu);
}

const toggleMenu = () => {
  console.log(`Menu Toggled!`);
  buttonRef.value.toggle(); // = !buttonRef.value.menuOpen;
  menuOpen.value
    ? closeMenu()
    : openMenu();
}

</script>

<script lang="ts">

export default {
  name: "MenuOld",
}
</script>

