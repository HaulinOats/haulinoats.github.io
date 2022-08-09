$(document).ready(function () {
  var experience_level_array = [];

  $(".right li").each(function () {
    experience_level_array.push($(this).text());
  });

  var li_height = $(".left ul li").first().height();
  $(".right ul li").height(li_height);

  calculateRatio();

  function calculateRatio() {
    var ratio = $(window).height() / $(window).width();
    $(".tech-section ul li").height(40 * ratio);
  }

  $(window).resize(function () {
    calculateRatio();
  });

  //Contact form
  emailjs.init("user_edxN8J1IcxZ58snUCCvmB");

  // Contact Form Submit
  document
    .querySelector("#contact-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      emailjs
        .sendForm("service_brnc745", "template_u86d2ao", "#contact-form")
        .then((resp) => {
          document.querySelector("#contact-sent").style.opacity = "1";
        })
        .catch((err) => {
          document.querySelector("#contact-error").style.opacity = "1";
        });
    });

  //populate skills section
  const skills = {
    languages: [
      { text: "HTML5", level: 5, logo: "HTML5_logo.svg" },
      { text: "CSS3", level: 5, logo: "CSS3_logo.svg" },
      { text: "Javascript", level: 5, logo: "JS_logo.svg" },
      { text: "Typescript", level: 4, logo: "TS_logo.svg" },
      { text: "NodeJS", level: 4, logo: "Node_logo.svg" },
      { text: "PHP", level: 3, logo: "PHP_logo.svg" },
      { text: "SQL", level: 3, logo: "MySQL_logo.png" },
      { text: "Ruby/Rails", level: 3, logo: "Ruby_logo.svg" },
      { text: "Java", level: 2, logo: "Java_logo.svg" },
      { text: "Python", level: 2, logo: "Python_logo.svg" },
    ],
    frameworks: [
      { text: "React", level: 5, logo: "React_logo.svg" },
      { text: "Svelte", level: 4, logo: "Svelte_logo.svg" },
      { text: "MeteorJS", level: 4, logo: "Meteor_logo.svg" },
      { text: "Express", level: 4, logo: "Express_logo.png" },
      { text: "Electron", level: 4, logo: "Electron_logo.svg" },
      { text: "Laravel", level: 3, logo: "Laravel_logo.svg" },
      { text: "Vue", level: 3, logo: "Vue_logo.svg" },
      { text: "Webpack", level: 3, logo: "Webpack_logo.svg" },
      { text: "Angular (2+)", level: 3, logo: "Angular_logo.svg" },
      { text: "Wordpress", level: 3, logo: "Wordpress_logo.svg" },
    ],
    other: [
      { text: "Visual Studio Code", level: 5, logo: "VSCode_logo.svg" },
      { text: "MongoDB", level: 4, logo: "MongoDB_logo.svg" },
      { text: "MySQL", level: 4, logo: "MySQL_logo.png" },
      { text: "Phonegap/Cordova", level: 4, logo: "phonegap_logo.svg" },
      { text: "REST APIs", level: 4, logo: "REST_logo.svg" },
      { text: "Git/SVN", level: 4, logo: "Git_logo.svg" },
      { text: "JSON/XML", level: 4, logo: "JSON_logo.svg" },
      { text: "Active Record", level: 3, logo: "Rails_logo.png" },
      { text: "Object-Oriented", level: 3, logo: "OOP_logo.svg" },
      { text: "Command Line", level: 3, logo: "Terminal_logo.svg" },
    ],
  };

  const skillText = {
    1: "Noob",
    2: "Beginner",
    3: "Intermediate",
    4: "Advanced",
    5: "Fluent",
  };

  let languagesHTML = "";
  let frameworksHTML = "";
  let otherHTML = "";

  for (const key in skills) {
    switch (key) {
      case "languages":
        languagesHTML = getTechSectionHTML(skills[key]);
        break;
      case "frameworks":
        frameworksHTML = getTechSectionHTML(skills[key]);
        break;
      case "other":
        otherHTML = getTechSectionHTML(skills[key]);
        break;
    }
  }

  document.getElementById("languages-section").innerHTML = languagesHTML;
  document.getElementById("frameworks-section").innerHTML = frameworksHTML;
  document.getElementById("other-section").innerHTML = otherHTML;

  function getTechSectionHTML(itemArr) {
    return itemArr
      .map((item) => {
        return `
				<div class="tech-section-inner-row">
					<div class="tech-section-inner-row-left">
            <img
              class="tech-icon"
              alt="icon"
              src="./img/icons/${item.logo}"
            />
						<p>${item.text}</p>
					</div>
					<div class="tech-section-inner-row-right">
						<div data-skill="${item.level}"></div>
						<div>
							<p class="skill-text">${skillText[item.level]}</p>
						</div>
					</div>
				</div>
			`;
      })
      .join("");
  }
});
