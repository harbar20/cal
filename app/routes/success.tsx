import { type LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUser } from "~/models/getUser";

export const loader = async ({ request }: LoaderArgs) => {
    return json(await getUser(request));
};

export default function Success() {
    const data = useLoaderData();

    console.log("I'm in success");
    console.log(data);

    let loginInfo;
    if (data.accessToken) {
        loginInfo = <p>Welcome, {data.name}!</p>;
    } else {
        loginInfo = <a href="/login">Login</a>;
    }

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
            <h1>Welcome to Remix! Success.</h1>
            {loginInfo}
        </div>
    );
}
