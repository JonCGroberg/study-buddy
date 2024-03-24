// Jank script to scrape one.uf.edu for all course codes and titles
// MUST CHANGE url and total TO USE FOR YEARS OTHER THAN SPRING 2024
async function getCourses(start) {
  let res = await fetch("https://one.uf.edu/apix/soc/schedule?ai=false&auf=false&category=CWSP&class-num=&course-code=&course-title=&cred-srch=&credits=&day-f=&day-m=&day-r=&day-s=&day-t=&day-w=&dept=&eep=&fitsSchedule=false&ge=&ge-b=&ge-c=&ge-d=&ge-h=&ge-m=&ge-n=&ge-p=&ge-s=&instructor=&last-control-number=" + start + "&level-max=&level-min=&no-open-seats=false&online-a=&online-c=&online-h=&online-p=&period-b=&period-e=&prog-level=&qst-1=&qst-2=&qst-3=&quest=false&term=2241&wr-2000=&wr-4000=&wr-6000=&writing=false&var-cred=&hons=false", {
    "method": "GET"
});
  let json = await res.json();
  return [json[0].COURSES, json[0].LASTCONTROLNUMBER, json[0].RETRIEVEDROWS];
}

async function getAllCourses() {
  let weirdId = 0;
  let last = 0;
  const total = 4528;
  let courses = [];

  while(last < total) {
    let idek = await getCourses(weirdId);
    courses = [...courses, ...idek[0]];
    weirdId = idek[1];
    last += idek[2];
    console.log(last + "/" + total);
    setTimeout(1000);
  }
  
  return courses;
}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

const courses = await getAllCourses();
download(JSON.stringify([...new Set(courses.map(
  (course) => ({ code: course.code, name: course.name })))]), "courses.json", "text/plain");

