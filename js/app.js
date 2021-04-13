/* Variables to make functional button "more or less" */
const button = document.getElementById('clock-button');
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
const showHour = () => {
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

const showMeridiem = (hour) => {
   hour.getHours() < 12 ? hourMeridiem.textContent = 'A.M' : hourMeridiem.textContent = 'P.M'
}

const dayState = (state) => {
   if (state.getHours() < 17) {
      for(icon of dayIcons) {icon.classList.remove('active')};
      dayIcons[0].classList.add('active');
      wrapper.style.background = 'url(img/bg_daylight.jpg) center';
      document.getElementById('greeting').textContent = "good morning. it's currently";
   } else {
      for(icon of dayIcons) {icon.classList.remove('active')};
      dayIcons[1].classList.add('active');
      wrapper.style.background = 'url(img/bg_night.jpg) center';
      document.getElementById('greeting').textContent = "good evening. it's currently";
   }
};

setInterval(() => {
   showHour();
}, 1000);