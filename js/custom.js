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
      { text: "HTML5", level: 5 },
      { text: "CSS3", level: 5 },
      { text: "Javascript", level: 5 },
      { text: "Typescript", level: 4 },
      { text: "NodeJS", level: 4 },
      { text: "PHP", level: 3 },
      { text: "SQL", level: 3 },
      { text: "Ruby/Rails", level: 3 },
      { text: "Java", level: 2 },
      { text: "Python", level: 2 },
    ],
    frameworks: [
      { text: "React", level: 5 },
      { text: "Svelte", level: 4 },
      { text: "MeteorJS", level: 4 },
      { text: "Express", level: 4 },
      { text: "Electron", level: 4 },
      { text: "Laravel", level: 3 },
      { text: "Vue", level: 3 },
      { text: "Webpack", level: 3 },
      { text: "Angular (2+)", level: 3 },
      { text: "Wordpress", level: 3 },
    ],
    other: [
      { text: "Visual Studio Code", level: 5 },
      { text: "MongoDB", level: 4 },
      { text: "MySQL", level: 4 },
      { text: "Phonegap/Cordova", level: 4 },
      { text: "REST APIs", level: 4 },
      { text: "Git/SVN", level: 4 },
      { text: "JSON/XML", level: 4 },
      { text: "Active Record", level: 3 },
      { text: "Object-Oriented", level: 3 },
      { text: "Command Line", level: 3 },
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
