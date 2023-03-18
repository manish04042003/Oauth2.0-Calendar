const { json } = require("body-parser");
const express = require("express");
var path = require("path");
const app = express();
const { google } = require("googleapis");

app.use(json());

// create oauthuser
let Google_client_id =
  "974935965592-lpojfpui5rl7d3rdkpaapaj65okklt4b.apps.googleusercontent.com";
let Google_client_secret = "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";
let redirect_link = "http://localhost:4400/success";

let refresh_token =
  "1//0gZ8kJUSgwz9vCgYIARAAGBASNwF-L9Irsiijbt3sv9ajsBJT4WgdpMboVn3IMUX-YTrV77cCueEEHL0ceeDNe4kbMCIdR47CTtg";

const oauthclient = new google.auth.OAuth2(
  Google_client_id,
  Google_client_secret,
  redirect_link
);

// app.use(express.static('public'));
app.get("/", (req, res) => {
  console.log("//////////");
  // res.sendFile('./public/index.html')
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "/public", "index.html"));
});

app.get("/success", (req, res) => {
  // res.sendFile('./public/index.html')
  res.sendFile(path.join(__dirname, "/public", "success.html"));
});

// Create Token api ?\
app.post("/createToken", async (req, res) => {
  try {
    let { code } = req.body.authInfo;
    let { tokens } = await oauthclient.getToken(code);
    //   console.log(tokens)
    res.status(200).json({ response: "Response received", tokens: tokens });
  } catch (err) {
    console.log(err);
  }
});

app.post("/createEvent", async (req, res) => {
  try {
    let { summary, location, description, start, end } = req.body;
    oauthclient.setCredentials({ refresh_token: refresh_token });
    const calendar = google.calendar("v3");
    const response = await calendar.events.insert(
      {
        auth: oauthclient,
        calendarId: "primary",
        requestBody: {
          summary: summary,
          description: description,
          location: location,
          colorId: "2",
          start: {
            dateTime: new Date(start),
            timeZone: "Asia/Kolkata",
          },
          end: {
            dateTime: new Date(end),
            timeZone: "Asia/Kolkata",
          },
          conferenceData: {
            createRequest: {
              conferenceSolutionKey: {
                type: "hangoutsMeet",
              },
              requestId: "some-random-string",
            },
          },
          attendees: [{ email: "doodlebookofficial@gmail.com" }],
          reminders: {
            useDefault: true
            // overrides: [
            //     { 'method': 'email', 'minutes': 24 * 60 },
            //     { 'method': 'popup', 'minutes': 10 }
            // ]
        },
        },
        conferenceDataVersion: 1,
      },
      (err, res) => {
        if (err) {
          console.error(`Error creating event: ${err}`);
          return;
        }
        const meetLink = res.data.hangoutLink;
        console.log(`Event created with Meet link: ${meetLink}`);
      }
    );

    // console.log(req.body)
    res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
  }
});

app.listen(4400, () => {
  console.log("app is ruling on port number at 4400");
});
