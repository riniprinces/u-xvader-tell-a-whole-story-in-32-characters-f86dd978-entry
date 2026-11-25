// make.fun — "Tell a Whole Story in 32 Characters" (u-xvader)
// ------------------------------------------------------------------
// One Wi-Fi network name, at most 32 characters, that is funny and
// hints at a whole story — the kind of name a stranger screenshots
// from their phone's network list.
//
// The name:
//     The WiFi Outlived The Marriage
//
// Read it once and the story is there: a household, a couple, and a
// marriage that ended — while the router, stubbornly, is still alive.
// The punchline is the survivor. No stock Wi-Fi joke, no password gag,
// no "FBI Surveillance Van": just a deadpan obituary for a marriage,
// told by the network that outlasted it.
//
// Gate (from the competition kit): /output/entry.txt must be UTF-8
// text of 1 to 32 characters, not only whitespace. This program
// checks that gate itself, then writes the file.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY = {
  // The Wi-Fi name. 30 characters: short enough to scan at a glance,
  // long enough to carry a situation, a character and an event.
  name: "The WiFi Outlived The Marriage",
  outputPath: "/output/entry.txt",
  minChars: 1,
  maxChars: 32,
} as const;

function countCharacters(text: string): number {
  return Array.from(text).length;
}

function assertValidWifiName(name: string): void {
  const length = countCharacters(name);
  if (length < ENTRY.minChars || length > ENTRY.maxChars) {
    throw new Error(
      `Wi-Fi name must be ${ENTRY.minChars}–${ENTRY.maxChars} characters; got ${length}.`,
    );
  }
  if (name.trim() === "") {
    throw new Error("Wi-Fi name must contain more than whitespace.");
  }
  // Round-trip through UTF-8: the file the grader reads is UTF-8 text,
  // so the name must survive the encode/decode unchanged.
  const roundTripped = Buffer.from(name, "utf8").toString("utf8");
  if (roundTripped !== name) {
    throw new Error("Wi-Fi name is not clean UTF-8 text.");
  }
}

function main(): void {
  assertValidWifiName(ENTRY.name);
  mkdirSync("/output", { recursive: true });
  writeFileSync(ENTRY.outputPath, `${ENTRY.name}\n`, { encoding: "utf8" });
  console.log(
    `Wrote ${countCharacters(ENTRY.name)}-character Wi-Fi name ` +
      `"${ENTRY.name}" to ${ENTRY.outputPath}`,
  );
}

main();
