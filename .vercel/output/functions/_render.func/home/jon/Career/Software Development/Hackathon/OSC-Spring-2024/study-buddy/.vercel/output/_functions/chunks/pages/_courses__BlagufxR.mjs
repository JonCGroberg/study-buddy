import { c as createAstro, d as createComponent, r as renderTemplate, e as renderSlot, f as renderHead, m as maybeRenderHead, g as renderComponent } from '../astro_BkfRJKdQ.mjs';
import 'kleur/colors';
import 'html-escaper';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import 'clsx';
import { jsxs, jsx } from 'react/jsx-runtime';
/* empty css                          */
import { useState, useEffect } from 'react';

const activeApps = getApps();
const serviceAccount = {
  type: "service_account",
  project_id: "studdybuddy-e03b7",
  private_key_id: "0f6a4db124ee76590e0154506aee327bc750ac14",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCv73tmj34XzuVy\nGQ9wAQQGAFgpUdwUy9FDtJcImgSaTmDYJcWwzrWreVjbtHPsR4p6qvCA1HETvmks\nQmLgKMM1+6JKFD0AFT4XwX6NuQ3p/bvKJ7hX6UERXU06CggwXTip25MMbrYFFzBR\nxLPHqb7U8fxWtm8rig6A9tVTl1JTVdPLFnSwce+TJ1FmRmabeWsFl2YqSzAlWiK9\nsBLnQahfiKTXskLYku21qiGNzAGhZKx0yJAMjnnVK1fNL/CjfRHS0ax5li05kGnY\n+r5PWRw5bpVJo0xo7i3qrzpFVRN1A+H6iesfGoR6Sgml34jyDDEu0CNLTBo9+may\nAPYhCCpBAgMBAAECggEABcI11K/wcYTOBY+src64tB4VhKe3Z45az4elFGzfJvJX\nEOgemgiQEXhnuExGKZcXYSfAdsUNXPcz79UN8baf2h/eCmTycLLhTQuCMg8bNZwe\nphGqAuWhgbkfNp2+sh+RA91KKUNj7ZN6W0jQFiJYGtX/W5K93YvXqPC7X5CxywSz\nl3Wdy2JSyT7fPUl2nt1ye/vxKmCdPtswwhuZkZ0Lzlna0gM+vOMO4e5XjZ4TnsoJ\n4FssviHLJr79sv0pVQ0x028mAeeZsBbYEFTYHjbBTQih0igsW8ZCVcRznftpSzsA\nY6JrEPdyvMKLFVAqxQTUO+ztD28xNfPPmL9jRmvXeQKBgQDnj3Oqj8EZsVgqa8+D\n1ViEPFG9YOBKRb4H5MtA1WPvSdPI8njY4yp0Ja9ejRgfy1fBuxz32OX8eymTaXha\nkfF0uchKtd3waQwIaHvseHO59S6zgWB+hOeNR2Cz1JfQVQ9mAesef17jxjdArjoS\nwxxj3/fmlE0MkVrPH0Kg2dtuKQKBgQDCgRjU5eqe40RkGz5vGAwvISzRk/bmPCp2\n2lfE30RZswmda+/TWanXWa7GDP6ATmqFB67Vsza5du4RToky9fWphg6f+rFhHbn9\nrga9TlN9Dcsnk6mRw6utVF+mPNKmn3MqKXu76kYv+fz+idpouG9U7EAcF4cGQgjy\n6AdpVceuWQKBgGI7btwaY9acb0R/u+a3aPegByUJpdycPYNnwfndDKoEbb2/bxjD\nNc1T91NrE6LZRn8++4kBEH/NV9PbWF1DsGTOM3PONzq3tY0Tlg65Ao8OviMUbXT+\nuKQsdY+UTlro2sFxaubjLcP+4I2l26j98FtGNgoxO4ZrW1SmdEN8aCQRAoGASqQ8\nIUdyODNDBZ+m3/88fcGfb3X24/fm2+GCmRyNIFcis3S+fj8EfI4AEiTebeKp4g9G\nut+hep73UVDwOcxF0B6P8jjEZV6BB6cHExLB21W1xqRWCIgsk8GzSxpARI0gJufw\ngfavpK2stwmz9UgCAXcAS0eEG5Sv1nfQkE3I6VECgYB04rLXHbXfEqKo0Fka6JoF\ndIqw1NGCP4jWvPYYI4VKIuzSwB6OJBOCcW+W/+HBPyUnF/MR6MFXy55tl2kdXqDP\nQavJH7xk/SzWm/BNz4X9xEGixPPNupIELI7G2R5bh7oYne1WZMl6vTa2c/WtX9lv\nrF8g/OBeW86vf8LxAdKM4g==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-l2wq5@studdybuddy-e03b7.iam.gserviceaccount.com",
  client_id: "117271412378891074974",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-l2wq5%40studdybuddy-e03b7.iam.gserviceaccount.com"
};
const app = activeApps.length === 0 ? initializeApp({
  credential: cert(serviceAccount)
}) : activeApps[0];
const db = getFirestore();

const unknownUser = { id: "0", name: "<unknown>" };
async function serverStudySearch(courses) {
  const snapshot = await db.collection("groups").where("course", "in", courses).where("end", ">", Timestamp.now()).get();
  return Promise.all(
    snapshot.docs.map(
      async (doc) => await createStudyGroupType(doc.id, doc.data())
    )
  );
}
async function serverUserStudySearch(user) {
  const snapshot = await db.collection("groups").where("end", ">", Timestamp.now()).where("buddies", "array-contains-any", [user]).get();
  return Promise.all(
    snapshot.docs.map(
      async (doc) => await createStudyGroupType(doc.id, doc.data())
    )
  );
}
async function createStudyGroupType(docId, data) {
  const buddies = await Promise.all(
    data.buddies.map(async (buddy) => {
      const user = await getAuth(app).getUser(buddy);
      return !user ? unknownUser : { id: user.uid, name: user.displayName };
    })
  );
  return {
    id: docId,
    course: data.course,
    course_title: data.course_title,
    name: data.name,
    description: data.description,
    start: data.start.toMillis(),
    end: data.end.toMillis(),
    location: data.location,
    buddies,
    max_buddies: data.max_buddies
  };
}
async function serverStudyBook(user, booking) {
  return await db.collection("groups").doc().set({
    course: booking.course,
    course_title: booking.course_title,
    name: booking.name,
    description: booking.description,
    start: new Timestamp(booking.start, 0),
    end: new Timestamp(booking.end, 0),
    location: booking.location,
    buddies: [user],
    max_buddies: booking.max_buddies
  });
}
async function serverStudyLeave(user, group) {
  const ref = db.collection("groups").doc(group);
  await ref.update({
    buddies: FieldValue.arrayRemove(user)
  });
  const doc = await ref.get();
  if (!doc.exists)
    return false;
  const data = doc.data();
  if (data.buddies.length == 0)
    await ref.delete();
  return true;
}
async function serverStudyJoin(user, group) {
  const ref = db.collection("groups").doc(group);
  const doc = await ref.get();
  if (!doc.exists)
    return false;
  const data = doc.data();
  if (data.buddies.length >= data.max_buddies || user in data.buddies)
    return false;
  await ref.update({
    buddies: FieldValue.arrayUnion(user)
  });
  return true;
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><link rel="icon" type="image/ico" href="/icon.ico"><title>Study Buddies ', '</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"><\/script><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">', "</head> <body> ", " </body></html>"])), title ? " | " + title : "", renderHead(), renderSlot($$result, $$slots["default"]));
}, "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/layouts/Layout.astro", void 0);

function formatAMPM(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.toLocaleString("en-us", { weekday: "long" });
  const today = (/* @__PURE__ */ new Date()).toLocaleString("en-us", { weekday: "long" });
  const hoursString = hours % 12 || 12;
  const minutesString = minutes.toString().padStart(2, "0");
  const ampmString = hours >= 12 ? "PM" : "AM";
  const dayString = day === today ? "" : day;
  return `${hoursString}:${minutesString} ${ampmString} ${dayString}`;
}
function getWeekDates() {
  const start = /* @__PURE__ */ new Date();
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = /* @__PURE__ */ new Date();
    date.setDate(start.getDate() + i);
    dates.push(date);
  }
  return dates;
}
function getTimeBlock(i) {
  const date = /* @__PURE__ */ new Date();
  date.setHours(Math.floor(i / 4));
  date.setMinutes(i % 4 * 15);
  date.setSeconds(0);
  return date;
}
function getUnixTimestampFromInputs(day, time) {
  if (!day || !time)
    return void 0;
  const date = getTimeBlock(time);
  date.setDate(Number(date.getDate()) + Number(day));
  return Math.floor(date.getTime() / 1e3);
}

function stringToHash(string) {
  let hash = 0;
  if (string.length == 0)
    return hash;
  for (let i = 0; i < string.length; i++) {
    let char = string.charCodeAt(i);
    hash = (hash << 6) - hash + char;
    hash = hash & hash;
  }
  return hash;
}
function getCourseColor(course) {
  const colors = [
    "#FF2E2E",
    "#FFA14A ",
    "#F5DF14",
    "#60DD5E",
    "#3ABE6F",
    "#39BCBC",
    "#3F7BC2",
    "#5E2A92",
    "#BC64C4",
    "#ED6890"
  ];
  return colors[Math.abs(stringToHash(course) % colors.length)];
}

const Card = ({ cardData, userId }) => {
  let userAlreadyJoined = cardData.buddies.map((user) => user.id).includes(userId);
  const outlineColor = getCourseColor(cardData.course);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "card px-2 shadow-sm py-0 py-sm-2",
      style: {
        border: "0.1em solid " + outlineColor,
        borderLeft: "1em solid " + outlineColor
      },
      children: [
        /* @__PURE__ */ jsx(Modal, { cardData }),
        /* @__PURE__ */ jsxs("div", { className: "card-body row px-3 py-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "col align-items-center py-md-0 py-2", children: [
            /* @__PURE__ */ jsx("h6", { className: "col fw-bold py-0 py-0 mb-1", children: /* @__PURE__ */ jsxs("span", { children: [
              cardData.course,
              " ",
              cardData.course_title,
              cardData.name != "" ? " - " + cardData.name : ""
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "row col-sm m-0 gap-1 pt-0", children: [
              /* @__PURE__ */ jsxs("h6", { className: "small col-lg-auto col-auto my-auto  bg-body-secondary align-content-center px-3 py-1 rounded-1 border", children: [
                "Ends ",
                formatAMPM(new Date(cardData.end)).toString()
              ] }),
              /* @__PURE__ */ jsx("h6", { className: " col-auto my-auto small text-secondary h-100 align-content-center ", children: cardData.location })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "col-12 col-md-auto my-auto my-auto  align-items-center px-4", children: /* @__PURE__ */ jsxs("div", { className: "row gap-1", children: [
            !userAlreadyJoined ? /* @__PURE__ */ jsx(JoinBtn, { cardData }) : /* @__PURE__ */ jsx(LeaveBtn, { cardData }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "btn btn-sm p-2 px-3 shadow-sm text-primary border border-light     fw-medium col",
                "data-bs-toggle": "modal",
                "data-bs-target": "#modal-" + cardData.id,
                children: "More Details"
              }
            )
          ] }) })
        ] })
      ]
    }
  );
};
const Modal = ({ cardData }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: "modal fade",
    id: "modal-" + cardData.id,
    tabIndex: -1,
    "aria-labelledby": "modal-label-" + cardData.id,
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsx("div", { className: "modal-dialog", children: /* @__PURE__ */ jsxs("div", { className: "modal-content", children: [
      /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ jsxs("h1", { className: "modal-title fs-5", id: "modal-label-" + cardData.id, children: [
          cardData.course + " - " + cardData.course_title,
          " "
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "btn-close",
            "data-bs-dismiss": "modal",
            "aria-label": "Close"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "modal-body", children: [
        cardData.name != "" && /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Name:" }),
          " ",
          cardData.name
        ] }),
        cardData.description != "" && /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Description:" }),
          /* @__PURE__ */ jsx("br", {}),
          cardData.description
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Location:" }),
          " ",
          cardData.location
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Start:" }),
          " ",
          new Date(cardData.start).toLocaleString()
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "End:" }),
          " ",
          new Date(cardData.end).toLocaleString()
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Group Size:" }),
          " ",
          cardData.max_buddies < 1 ? "unlimited" : cardData.max_buddies
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Group:" }),
          " ",
          cardData.buddies.map((buddy) => buddy.name).join(", ")
        ] })
      ] })
    ] }) })
  }
);
const JoinBtn = ({ cardData }) => /* @__PURE__ */ jsxs(
  "button",
  {
    onClick: () => handleJoin(cardData.id),
    className: "btn-sm btn small btn-outline-primary ms-0 p-2 py-2 px-3 mx-2 fw-medium  col-12 col-sm btn-width shadow-sm",
    children: [
      "Join This Group (" + cardData.buddies.length,
      "/",
      (cardData.max_buddies < 1 ? "∞" : cardData.max_buddies) + ")"
    ]
  }
);
const LeaveBtn = ({ cardData }) => /* @__PURE__ */ jsxs(
  "button",
  {
    onClick: () => handleLeave(cardData.id),
    className: "btn-sm btn small btn-outline-danger ms-0 p-2 py-2 px-3 mx-2 fw-medium  col-12 col-sm  btn-width ",
    children: [
      "Leave This Group (" + cardData.buddies.length,
      "/",
      (cardData.max_buddies < 1 ? "∞" : cardData.max_buddies) + ")"
    ]
  }
);
const handleLeave = (groupID) => fetch("/api/leave", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ group: groupID })
}).then((res) => {
  if (res.ok)
    window.location.reload();
});
const handleJoin = (groupID) => fetch("/api/join", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ group: groupID })
}).then((res) => {
  if (res.ok)
    window.location.reload();
});

const Timeline = ({ studyGroups, userId }) => /* @__PURE__ */ jsx("div", { className: "row gap-3 py-4 my-4 px-0 px-md-0 px-md-5 m-0 mx-lg-0 mx-md-5", children: studyGroups.length == 0 ? /* @__PURE__ */ jsx(BookSession, {}) : studyGroups.map((sameHourGroups, index) => /* @__PURE__ */ jsxs("div", { children: [
  /* @__PURE__ */ jsx(CardGroupHeader, { sameHourGroups }),
  /* @__PURE__ */ jsx(CardGroup, { userId, sameHourGroups })
] }, index)) });
const BookSession = () => /* @__PURE__ */ jsx(
  "div",
  {
    className: "col-auto text-center w-100 mx-auto card p-5 text-center ",
    style: { maxWidth: 400 },
    children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
      /* @__PURE__ */ jsx("p", { children: "No Sessions Found" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn btn-primary",
          "data-bs-toggle": "modal",
          "data-bs-target": "#modal-book",
          children: "Book one now!"
        }
      )
    ] })
  }
);
const CardGroupHeader = ({ sameHourGroups }) => /* @__PURE__ */ jsx("h6", { className: "small w-100 border-1 border-bottom border-dark-subtle pb-2 mt-0 mb-4", children: formatAMPM(new Date(Number(sameHourGroups[0]) * 1e3)).toString() });
const CardGroup = ({ userId, sameHourGroups }) => /* @__PURE__ */ jsx("div", { className: "small px-3 ps-sm-3 ps-lg-4 ms-sm-3 ms-lg-4 row gap-3", children: sameHourGroups[1].map((group, index) => {
  return /* @__PURE__ */ jsx(Card, { cardData: group, userId }, index);
}) });

const BookingModal = () => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "modal fade ",
      id: "modal-book",
      tabIndex: -1,
      "aria-labelledby": "modal-label-book",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("div", { className: "modal-dialog ", children: /* @__PURE__ */ jsxs("div", { className: "modal-content rounded-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
          /* @__PURE__ */ jsxs("h1", { className: "modal-title fs-5 px-2", id: "modal-label-book", children: [
            " ",
            "Create a New Study Session"
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "btn-close",
              "data-bs-dismiss": "modal",
              "aria-label": "Close"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "model-body p-2 pt-0", children: /* @__PURE__ */ jsx(Form, {}) })
      ] }) })
    }
  );
};
const Form = () => {
  let [inputs, setInputs] = useState({});
  let [options, setOptions] = useState([]);
  let [searchResults, setSearchResults] = useState([]);
  let [search, setSearch] = useState([]);
  let [dropdown, setDropdown] = useState(false);
  console.log("booking modal");
  useEffect(() => {
    fetch("/courses.json", { method: "GET" }).then((res) => res.json()).then((data) => {
      setOptions(data);
    });
  }, []);
  const handleChange = (event, name, value) => {
    if (!name)
      name = event.target.name;
    if (!value)
      value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      className: "modal-body",
      onSubmit: (e) => handleSubmit(e, inputs),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "card-body pt-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: " form-label ", children: " Course Name " }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                className: "form-control",
                value: search,
                placeholder: "Start Searching",
                onChange: (e) => {
                  setSearch(e.target.value.toUpperCase());
                  if (e.target.value) {
                    setDropdown(true);
                    setSearchResults(
                      options.filter(
                        (option) => option.code.includes(e.target.value.toUpperCase())
                      ).slice(0, 15)
                    );
                  } else {
                    setDropdown(false);
                    setSearchResults();
                  }
                }
              }
            ),
            dropdown ? /* @__PURE__ */ jsxs(
              "select",
              {
                defaultValue: [],
                onChange: (e) => {
                  const parsedData = JSON.parse(e.target.value);
                  handleChange(e, "courseCode", parsedData.code);
                  handleChange(e, "courseName", parsedData.name);
                },
                className: " form-select",
                children: [
                  /* @__PURE__ */ jsx("option", { defaultValue: [], children: " Select Class" }),
                  searchResults.map((option, index) => /* @__PURE__ */ jsx("option", { value: JSON.stringify(option), children: option.code + " -  " + option.name }, index))
                ]
              }
            ) : ""
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "my-3", children: [
            /* @__PURE__ */ jsxs("label", { className: "form-label w-100", children: [
              " Study Group Name ",
              /* @__PURE__ */ jsx("span", { className: "text-secondary", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                name: "name",
                value: inputs.name || "",
                onChange: handleChange,
                className: "form-control",
                placeholder: "Enter Study Session Name"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "location", className: "form-label", children: " Location " }),
            /* @__PURE__ */ jsx(
              "input",
              {
                className: "form-control",
                name: "location",
                value: inputs.location || "",
                onChange: handleChange,
                required: true,
                placeholder: "Enter location"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "size", className: "form-label", children: "Group Size" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                name: "groupSize",
                className: "form-select",
                value: inputs.groupSize,
                required: true,
                onChange: handleChange,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select Group Size" }),
                  /* @__PURE__ */ jsx("option", { value: "4", children: "Small (4)" }),
                  /* @__PURE__ */ jsx("option", { value: "8", children: "Medium (8)" }),
                  /* @__PURE__ */ jsx("option", { value: "16", children: "Large (16)" }),
                  /* @__PURE__ */ jsx("option", { value: "-1", children: "Unlimited" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "row mb-3", children: [
            /* @__PURE__ */ jsx("label", { className: "form-label", children: "Start" }),
            /* @__PURE__ */ jsx("div", { className: "col", children: /* @__PURE__ */ jsxs(
              "select",
              {
                name: "startDate",
                className: "form-select",
                value: inputs.startDate,
                required: true,
                onChange: handleChange,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select Start Date" }),
                  getWeekDates().map((date, index) => /* @__PURE__ */ jsx("option", { value: index, children: date.toLocaleString("en-us", { weekday: "long" }) + ", " + date.toLocaleString("en-us", { month: "long" }) + " " + date.getDate() }, index))
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("span", { className: "col-auto", children: /* @__PURE__ */ jsx("label", { className: "form-label", children: "@" }) }),
            /* @__PURE__ */ jsx("div", { className: "col", children: /* @__PURE__ */ jsxs(
              "select",
              {
                name: "startTime",
                className: "form-select",
                value: inputs.startTime,
                onChange: handleChange,
                required: true,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select Start Time" }),
                  [...Array(24 * 4).keys()].map((index) => /* @__PURE__ */ jsx("option", { value: index, children: getTimeBlock(index).toLocaleTimeString("en-US") }, index))
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "row mb-3", children: [
            /* @__PURE__ */ jsx("label", { className: "form-label", children: "End" }),
            /* @__PURE__ */ jsx("div", { className: "col", children: /* @__PURE__ */ jsxs(
              "select",
              {
                name: "endDate",
                className: "form-select",
                value: inputs.endDate,
                onChange: handleChange,
                required: true,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select End Date" }),
                  getWeekDates().map((date, index) => /* @__PURE__ */ jsx("option", { value: index, children: date.toLocaleString("en-us", { weekday: "long" }) + ", " + date.toLocaleString("en-us", { month: "long" }) + " " + date.getDate() }, index))
                ]
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("label", { className: "form-label", children: "@" }) }),
            /* @__PURE__ */ jsx("div", { className: "col", children: /* @__PURE__ */ jsxs(
              "select",
              {
                name: "endTime",
                className: "form-select",
                value: inputs.endTime,
                onChange: handleChange,
                required: true,
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select End Time" }),
                  [...Array(24 * 4).keys()].map((index) => /* @__PURE__ */ jsx("option", { value: index, children: getTimeBlock(index).toLocaleTimeString("en-US") }, index))
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsxs("label", { className: "form-label", children: [
              " Description ",
              /* @__PURE__ */ jsx("span", { className: "text-secondary", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                name: "description",
                value: inputs.description || "",
                onChange: handleChange,
                className: "form-control",
                placeholder: "Begin Typing to add a description",
                rows: 3
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-3", children: /* @__PURE__ */ jsx(
            "button",
            {
              id: "bookButton",
              type: "submit",
              className: "btn btn-primary mx-auto w-100",
              children: "Create"
            }
          ) })
        ] }),
        [...Object.entries(inputs)].map((x) => /* @__PURE__ */ jsx("p", { children: x }))
      ]
    }
  );
};
function handleSubmit(e, {
  endDate,
  endTime,
  startDate,
  startTime,
  courseCode,
  courseName,
  description,
  location,
  groupSize,
  name
}) {
  e.preventDefault();
  const start = getUnixTimestampFromInputs(startDate, startTime);
  const end = getUnixTimestampFromInputs(endDate, endTime);
  const studyGroup = {
    course: courseCode,
    course_title: courseName,
    name: name || "",
    description: description || "",
    start,
    end,
    location,
    max_buddies: groupSize
  };
  console.log(studyGroup);
  fetch("/api/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(studyGroup)
  }).then((res) => {
    if (res.ok)
      window.location.replace("/");
    else
      console.log(res);
  });
}

const $$Astro$1 = createAstro();
const $$Nav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Nav;
  const { title = "", bookable = true } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav class="navbar navbar-expand-lg bg-white shadow-sm border"> <div class="container-fluid px-3"> <a class="navbar-brand" href="/"> <img src="/image.png"> <span class="px-3 text-primary fw-bold">StudyBuddies</span> </a> <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse text-center align-content-center " id="navbarSupportedContent"> <ul class="navbar-nav mb-2 mb-lg-0"></ul> <div class="d-flex flex-grow-1 text-center px-5 mx-5"> <h6 class="text-center w-100 fw-bold"> ${void 0} </h6> </div> ${bookable ? renderTemplate`<a href="/book" class="btn btn-primary me-0" data-bs-toggle="modal" data-bs-target="#modal-book"> ${"New Study Session"} </a>` : renderTemplate`<div class="px-5"></div>`} <a href="/api/auth/signout" class="btn btn-outline-secondary ms-2">Signout</a> </div> </div> </nav> ${renderComponent($$result, "BookingModal", BookingModal, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/components/BookingModal", "client:component-export": "default" })}`;
}, "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/components/Nav.astro", void 0);

const Search = ({ courses = [] }) => {
  let [options, setOptions] = useState([]);
  let [searchResults, setSearchResults] = useState([]);
  let [search, setSearch] = useState([]);
  let [dropdown, setDropdown] = useState(false);
  let [selected, setSelected] = useState(courses);
  useState();
  useEffect(() => {
    fetch("/courses.json", { method: "GET" }).then((res) => res.json()).then((data) => {
      setOptions(data);
    });
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "mt-5 ms-0 ps-0 px-md-4 px-md-3 ", children: /* @__PURE__ */ jsxs("div", { className: "row px-0 ms-0 me-0 px-sm-0 px-md-4", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-100",
        children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: "form-control",
              value: search,
              placeholder: "Start Searching",
              onChange: (e) => {
                setSearch(e.target.value.toUpperCase());
                if (e.target.value) {
                  setDropdown(true);
                  setSearchResults(
                    options.filter((option) => {
                      const upper = e.target.value.toUpperCase();
                      return (option.code.includes(upper) || option.name.toUpperCase().includes(upper)) && !courses.includes(option.code);
                    }).slice(0, 15)
                  );
                } else {
                  setDropdown(false);
                  setSearchResults();
                }
              }
            }
          ),
          dropdown ? /* @__PURE__ */ jsxs(
            "select",
            {
              defaultValue: [],
              onChange: (e) => {
                if (!e.target.value)
                  return;
                if (selected.includes(e.target.value))
                  return;
                const newSelected = [...selected, e.target.value];
                window.location.replace(
                  "/search/" + newSelected.join("&") + "?lastSearch=" + search
                );
                setSelected(newSelected);
              },
              className: " form-select",
              children: [
                /* @__PURE__ */ jsx("option", { selected: "selected", children: " Select Result" }),
                searchResults.map((option, index) => /* @__PURE__ */ jsx("option", { value: option.code, children: option.code + " -  " + option.name }, index))
              ]
            }
          ) : ""
        ] })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "col", children: /* @__PURE__ */ jsx("div", { className: " align-content-center pt-4", children: selected.map((code, index) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => {
          const filtered = selected.filter((elem) => elem != code);
          setSelected(filtered);
          window.location.replace(
            filtered.length == 0 ? "/" : "/search/" + filtered.join("&") + "?=" + search
          );
        },
        className: "btn btn-sm btn-light col mx-1 ps-3 fw-light shadow-sm  ",
        style: { border: "1px solid " + getCourseColor(code) },
        children: [
          code,
          /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx("i", { className: "bi bi-x ps-1" }) })
        ]
      },
      index
    )) }) })
  ] }) });
};

const $$Astro = createAstro();
const $$courses = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$courses;
  const { courses } = Astro2.params;
  const auth = getAuth(app);
  let user;
  if (Astro2.cookies.has("session"))
    user = await auth.verifySessionCookie(Astro2.cookies.get("session").value);
  if (!user)
    return Astro2.redirect("/welcome");
  const map = /* @__PURE__ */ new Map();
  const groups = await serverStudySearch(courses.split("&"));
  groups.forEach(async (studyGroup) => {
    const truncatedToHours = studyGroup.start / 1e3 - studyGroup.start / 1e3 % 3600;
    if (map.has(truncatedToHours))
      map.set(truncatedToHours, [...map.get(truncatedToHours), studyGroup]);
    else
      map.set(truncatedToHours, [studyGroup]);
  });
  const sortedChunks = [...map.entries()].sort(
    (a, b) => new Date(b[0]).getDate() - new Date(a[0]).getDate()
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Search" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="bg-body-secondary pb-5" style="min-height: 100vh;"> ${renderComponent($$result2, "Nav", $$Nav, { "title": "Find Study Groups" })} ${renderComponent($$result2, "Search", Search, { "courses": [...courses.split("&")], "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/components/Search", "client:component-export": "default" })} ${renderComponent($$result2, "Timeline", Timeline, { "client:load": true, "studyGroups": sortedChunks, "userId": user.uid, "client:component-hydration": "load", "client:component-path": "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/components/Timeline", "client:component-export": "default" })} </div> ` })}`;
}, "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/pages/search/[courses].astro", void 0);

const $$file = "/home/jon/Career/Software Development/Hackathon/OSC-Spring-2024/study-buddy/src/pages/search/[courses].astro";
const $$url = "/search/[courses]";

const _courses_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$courses,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Nav as $, Search as S, Timeline as T, _courses_ as _, app as a, serverUserStudySearch as b, $$Layout as c, serverStudyJoin as d, serverStudyLeave as e, serverStudyBook as s };
