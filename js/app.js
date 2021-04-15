/* Variables to make functional button "more or less" */
const button = document.getElementById('clock-button');
const twelveClock = document.getElementById('twelve-clock');
const twentyFourClock = document.getElementById('twenty-four-clock');
const activeState = document.getElementById('active-state');
const wrapper = document.getElementById('wrapper');
const dayIcons = document.getElementsByClassName('icon');

/* Variables to change hour, and city text according to where the user is */
const hour = document.getElementById('hour');
const hourMeridiem = document.getElementById('hour-meridiem');
const dataYear = document.getElementById('data-year');

/* Button trigger function */
if(window.innerWidth <= 800) {
   button.addEventListener('click', () => {
      wrapper.classList.toggle('wrapper_mobile');

      if(wrapper.classList.contains('wrapper_mobile')) {
         activeState.style.display = 'block';
         button.classList.add('active-button');
         document.querySelector('.clock-button__label').textContent = 'less';
      } else {
         activeState.style.display = 'none';
         button.classList.remove('active-button');
         document.querySelector('.clock-button__label').textContent = 'more';
      }
   });
} else {
   button.addEventListener('click', () => {
      button.classList.toggle('active-button');

      if(button.classList.contains('active-button')) {
         activeState.style.display = 'block';
         document.querySelector('.clock-button__label').textContent = 'less';
      } else {
         activeState.style.display = 'none';
         document.querySelector('.clock-button__label').textContent = 'more';
      }
   })
};

/* Clock Functions */
const showTwentyFourHour = () => {
   let date = new Date();

   if(date.getMinutes() < 10) {
      hour.textContent = `${date.getHours()}:0${date.getMinutes()}`;
   } else {
      hour.textContent = `${date.getHours()}:${date.getMinutes()}`;
   }

   dataYear.textContent = date.getFullYear();

   showMeridiem(date);
   dayState(date);
}

const showTwelveHour = () => {
   let date = new Date();

   /* Verify time is one pm or more. */
   if(date.getHours() >= 13) {
      /* If the conditional above is true, I verify if minutes is less than 10, if it is so, then add a 0 to show minutes with two digits, if it is not, then show minutes in the normal way. */
      if(date.getMinutes() < 10) {
         hour.textContent = `${date.getHours() - 12}:0${date.getMinutes()}`;
      } else {
         hour.textContent = `${date.getHours() - 12}:${date.getMinutes()}`;
      }
   } else {
      /* I dit the same comprobation above here, because program need to know how show minutes normal, or on the other hand show with a 0 before */
      if(date.getMinutes() < 10) {
         hour.textContent = `${date.getHours()}:0${date.getMinutes()}`;
      } else {
         hour.textContent = `${date.getHours()}:${date.getMinutes()}`;
      }
   }

   dataYear.textContent = date.getFullYear();

   showMeridiem(date);
   dayState(date);
}

const showMeridiem = (hour) => {
   hour.getHours() < 12 ? hourMeridiem.textContent = 'A.M' : hourMeridiem.textContent = 'P.M'
}

const dayState = (state) => {
   if (state.getHours() < 17) {
      for(icon of dayIcons) {icon.classList.remove('active')};
      dayIcons[0].classList.add('active');
      state.getHours() >= 12 ?
      document.getElementById('greeting').textContent = "good afternoon. it's currently"
      :
      document.getElementById('greeting').textContent = "good morning. it's currently";
   } else {
      for(icon of dayIcons) {icon.classList.remove('active')};
      dayIcons[1].classList.add('active');
      wrapper.style.background = 'url(img/bg_night.jpg) center';
      document.getElementById('greeting').textContent = "good evening. it's currently";
   }
};

const whichBrowser = () => {
   /* Variables to define user's browser*/
   const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
   const isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
   
   /* Conditional to show an alert about backdrop property is not defined on browser*/
   if(isChrome === true || isSafari === true) {
      return;
   } else {
      console.log('backdrop-filter property is not supported on your browser. You will see a custom background instead');
   }
}

whichBrowser();

const intervals = [setInterval(showTwentyFourHour, 1000), setInterval(showTwelveHour, 1000), setInterval(showTwentyFourHour, 1000)];

intervals.forEach(interval => clearInterval(interval + 1));

twelveClock.addEventListener('click', () => {
   intervals.forEach(interval => clearInterval(interval));
   intervals.push(setInterval(showTwelveHour, 1000));
});

twentyFourClock.addEventListener('click', () => {
   intervals.forEach(interval => clearInterval(interval));
   intervals.push(setInterval(showTwentyFourHour, 1000));
})