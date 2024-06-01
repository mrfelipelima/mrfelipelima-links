import Image from "next/image";
import { Person, WithContext } from "schema-dts";
import { z } from "zod";

import { SocialIcons } from "@/components/SocialIcons";

import LinkButton from "@/components/LinkButton";
import { db } from "@/lib/firebase";
import felipeLima from "@/public/assets/felipe.jpg";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const person: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Felipe Lima",
  email: "mrfelipelima@gmail.com",
  image:
    "https://firebasestorage.googleapis.com/v0/b/mrfelipelima-409ed.appspot.com/o/public%2Fimg%2F119681655_3876762852339046_5736681282524451695_n%20(1).jpg?alt=media",
  jobTitle: "Web engineer",
  url: "https://www.felipelima.net/",
};

const profileSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  about: z.string(),
});

const linksSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    position: z.number().default(0),
    description: z.string().default(""),
  })
);

export const revalidate = 60;

export default async function HomePage() {
  const docRef = doc(db, "configurations", "profile");
  const docSnapshot = await getDoc(docRef);

  const { name, tagline, about } = profileSchema.parse(docSnapshot.data());

  const linksRef = query(
    collection(db, "links"),
    where("visibility", "==", true)
  );
  const linksSnapshot = await getDocs(linksRef);

  const links = linksSchema.parse(Array.from(linksSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    }
  })))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person),
        }}
      />
      <div className="flex flex-col items-center justify-center gap-6 p-4">
        <div id="link-list-info" className="flex flex-col items-center gap-4">
          <Image
            className="h-32 w-32 rounded-full border-2 border-framboesa-500"
            src={felipeLima}
            width="144"
            height="144"
            alt="Foto de Felipe Lima"
            priority
          />
          <h1 className="font-alt text-center text-3xl leading-10 text-framboesa-500">
            {name}
          </h1>
          <span className="text-xl">{tagline}</span>
          <span className="text-center text-base">{about}</span>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-6 md:w-1/2">
          <nav className="w-full">
            <ul className="flex w-full flex-col items-center gap-4">
              {links.map((link) => {
                return (
                  <LinkButton key={link.id} title={link.title} id={link.id} />
                );
              })}
            </ul>
          </nav>
        </div>
        <SocialIcons />
      </div>
    </>
  );
}
