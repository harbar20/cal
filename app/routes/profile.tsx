import { type LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUser } from "~/models/getUser";

export const loader = async ({ request }: LoaderArgs) => {
    const user = await getUser(request);

    const userJson = await user.json();

    console.log("user json: ");
    console.log(userJson);

    const response = await fetch("https://graph.microsoft.com/v1.0/me/calendar/getschedule", {
        headers: {
            "Authorization": `Bearer ${userJson.accessToken}`
        }
    });

    console.log("response: ");
    console.log(response);

    return json(response);
};

export default function Success() {
    const data = useLoaderData();

    console.log("I'm in profile");
    console.log(data);

    let loginInfo;
    if (data.accessToken) {
        loginInfo = <p>Welcome, {data.name}!</p>;
    } else {
        loginInfo = <a href="/login">Login</a>;
    }

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
            <h1>Welcome to Remix</h1>
            {loginInfo}
        </div>
    );
}
