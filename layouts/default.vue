<template>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <div id="root" :class="{home: isHome}">
    <AppHeader />
    <body :class="{home: isHome}"> <!-- header in body == not sticky -->
      <main>
        <a class="skip-to-content" href="#content" />
        <!-- <body> -->
          <div class="container">
            <slot id="content" />
          </div>
          <!-- <slot id="content"/> -->
        </main>
        <AppFooter class="default-footer" />
    </body>
  </div>
</template>
