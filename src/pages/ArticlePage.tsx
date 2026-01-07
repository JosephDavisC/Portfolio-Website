import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { articles } from '@/components/sections/Blog';

// Article content components - add full content for each article here
const ArticleContent: React.FC<{ articleId: string }> = ({ articleId }) => {
  switch (articleId) {
    case 'bc-hacks-2024':
      return (
        <div className="prose prose-invert max-w-none">
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            After helping organize and launch BC Hacks 2024, I was invited to give a lecture at
            Bellevue College about what it actually takes to run a successful hackathon. This session
            was specially arranged for a group of 20+ Korean exchange students visiting from Korea,
            and it became one of my favorite moments of the summer. It was a chance to reflect on everything
            our team built together.
          </p>

          <h2 id="what-is-bc-hacks" className="text-3xl font-bold text-red-400 mb-6">What Is BC Hacks?</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            BC Hacks is Bellevue College's annual student-run hackathon, a weekend where students
            from all backgrounds come together to brainstorm, design, and build creative projects in
            just 48 hours. It's completely beginner-friendly and organized by a collaboration of five
            student clubs: BC Tech Club, ACM, Innovators Hub, AI Ethics Club, and Filmmaking Club.
          </p>

          <div className="my-6 rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/article_media/bc-hacks-2024/Clubs.png"
              alt="Collaborating student clubs"
              className="w-full object-cover"
            />
            <p className="text-slate-400 text-sm text-center mt-3 italic">
              Five student clubs collaborated to make BC Hacks possible
            </p>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            The goal is simple: create a space that empowers students to innovate, learn new tools,
            and connect with mentors and industry professionals.
          </p>

          <div className="my-6 rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/article_media/bc-hacks-2024/Group_Photo.png"
              alt="BC Hacks 2024 participants and organizers"
              className="w-full object-cover"
            />
            <p className="text-slate-400 text-sm text-center mt-3 italic">
              BC Hacks 2024 participants and organizers
            </p>
          </div>

          <h2 id="five-months-planning" className="text-3xl font-bold text-red-400 mb-6">Five Months of Planning</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            Running a hackathon sounds exciting, but it's really a five-month journey of planning,
            coordination, and teamwork.
          </p>

          <h3 className="text-2xl font-semibold text-blue-400 mb-4">Month 1: Initial Planning</h3>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            We formed the organizing team, brainstormed the theme, and reached out to potential judges
            and mentors. Our vision was clear: make BC Hacks open to everyone, not just computer science majors.
          </p>

          <div className="my-6 rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/article_media/bc-hacks-2024/Team.png"
              alt="BC Hacks organizing team"
              className="w-full object-cover"
            />
            <p className="text-slate-400 text-sm text-center mt-3 italic">
              The organizing team behind BC Hacks 2024
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-blue-400 mb-4">Month 2: Logistics & Budgeting</h3>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            We secured Room U301 as our venue, drafted a budget of around $31,000, and set up
            communication platforms for the teams. Every small detail, from tables to name tags,
            needed careful planning.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/bc-hacks-2024/Venue.png"
                alt="BC Hacks venue setup in Room U301"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                The venue setup in Room U301, ready for participants
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/bc-hacks-2024/Room_Layout.png"
                alt="Event room layout planning"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                Planning the room layout for the event
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-blue-400 mb-4">Month 3: Outreach & Workshops</h3>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            Marketing kicked off, mentors confirmed, and judges finalized. We sent out judging rubrics
            and began preparing workshops like Intro to AI, Intro to API, and Intro to Git with
            guest speakers from Amazon, Google, and Microsoft.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/bc-hacks-2024/Marketing.png"
                alt="BC Hacks marketing and outreach"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                Marketing campaign and outreach materials
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/bc-hacks-2024/Judging_Rubric.png"
                alt="Judging rubric for BC Hacks"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                Judging rubric sent to judges and mentors
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-blue-400 mb-4">Month 4: Preparation</h3>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            The website went live, schedules were finalized, and our food vendors were booked. Everything
            was starting to come together.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/bc-hacks-2024/Schedule.png"
                alt="BC Hacks event schedule"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                Finalized event schedule for the weekend
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/bc-hacks-2024/Food_vendors.png"
                alt="Food vendors at BC Hacks"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                Food vendors booked for the event
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-blue-400 mb-4">Month 5: Execution Prep</h3>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            We tested equipment, trained volunteers, and ran a full dry-run of the event. It was a mix
            of nerves and excitement, but we were ready.
          </p>

          <h2 id="event-weekend" className="text-3xl font-bold text-red-400 mb-6">The Event Weekend</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            <strong className="text-slate-200">Day 1:</strong> Students checked in, grabbed swag bags,
            and joined hands-on workshops. Everyone was excited to learn and build.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/bc-hacks-2024/Checkin.JPG"
                alt="Student check-in at BC Hacks"
                className="w-full h-64 object-cover"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                Volunteers at the check-in desk ready to welcome participants
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/bc-hacks-2024/Workshops.png"
                alt="Workshop session at BC Hacks"
                className="w-full h-64 object-cover"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                Intro to API workshop with industry speakers
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/bc-hacks-2024/Participants.png"
                alt="Students working on their projects"
                className="w-full h-64 object-cover"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                Group Pictures!!
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            <strong className="text-slate-200">Day 2:</strong> Teams pitched their projects to a panel
            of six judges and fourteen mentors from companies like Meta, T-Mobile, and Hiya. Submissions
            were done through DevPost, and each group had to present both slides and a live demo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/bc-hacks-2024/Judging_1.png"
                alt="Teams presenting to judges"
                className="w-full h-64 object-cover"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                Teams presenting their projects to judges
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/bc-hacks-2024/Judging_2.png"
                alt="Project demonstrations"
                className="w-full h-64 object-cover"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                Live project demonstrations and Q&A
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            By the end of the second day, we announced winners for the three tracks:
          </p>
          <ul className="text-slate-300 text-lg leading-relaxed mb-6 list-disc list-inside space-y-2 ml-6">
            <li>Business & Innovation</li>
            <li>Personal Development & Wellness</li>
            <li>Education & Accessibility</li>
          </ul>

          <div className="my-6 rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/article_media/bc-hacks-2024/Winners.png"
              alt="BC Hacks 2024 award ceremony"
              className="w-full object-cover"
            />
            <p className="text-slate-400 text-sm text-center mt-3 italic">
              Celebrating the winning teams at BC Hacks 2024
            </p>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            But honestly, the best part wasn't the prizes. It was seeing students collaborate, learn
            from mentors, and make something they were proud of.
          </p>

          <h2 id="what-i-learned" className="text-3xl font-bold text-red-400 mb-6">What I Learned</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            BC Hacks taught me that organizing an event like this is just as challenging as building
            a project in it. Coordinating across multiple clubs meant balancing ideas, responsibilities,
            and timelines. It pushed me to lead meetings, manage deadlines, and communicate effectively.
          </p>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            More importantly, it showed me how powerful community can be. Mentors gave real-world advice,
            judges shared career insights, and students supported each other through every bug and crash.
          </p>

          <h2 id="closing-thoughts" className="text-3xl font-bold text-red-400 mb-6">Closing Thoughts</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            If you're thinking of organizing a hackathon yourself, do it. Start small, stay consistent,
            and keep your team motivated. The impact you create will be bigger than you think.
          </p>
        </div>
      );

    case 'my-journey':
      return (
        <div className="prose prose-invert max-w-none">
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            I think this all started when me and my family went to Atlanta for a summer trip to visit my cousins.
            When we were there, my dad suddenly got this idea — what if I studied in the U.S.? My dad even found a place
            called Baylor High School, and believe it or not, I almost moved there. But my dad decided to keep me in
            Highscope instead. (Yes, <span className="italic">Highscope Indonesia</span> — that's my school's actual name, not a typo of "high school" haha.)
          </p>

          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            Back then, I wasn't exactly the most responsible student. I played games all day, didn't really study,
            and just went with the flow. But seeing my cousins do so well and get into great schools really changed
            my mindset. When I got back to Indonesia and started grade 10 (which is when high school starts there),
            I decided I wanted to take things seriously.
          </p>

          <div className="my-8 rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/article_media/journey/Atlanta_Trip_Group_Photo.JPG"
              alt="Atlanta trip with family and cousins"
              className="w-full object-cover"
            />
            <p className="text-slate-400 text-sm text-center mt-3 italic">
              The Atlanta trip with my family and cousins that started everything
            </p>
          </div>

          <h2 id="the-start" className="text-3xl font-bold text-red-400 mb-6 mt-12">The Start of Everything</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            So I started grinding. Studying more, focusing on my classes, and trying to be my best self. One night,
            I was on a call with my old friend Caleb. We were just catching up, and he showed me a small website he
            was building. It was simple, but for some reason it sparked something in me.
          </p>

          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            I'd always been into tech, but I never actually tried coding before. That night changed everything. I
            started learning and joined some bootcamps — web development, UI/UX, and later Unity 3D. I ended up really
            liking it, and that's when I realized maybe this is what I want to do.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/journey/VR_Park.png"
                alt="VR Park internship"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                VR Park - my first internship as a Game Developer
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/journey/Highscope_Class_K_Picture.JPG"
                alt="Highscope classroom"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                My Highscope days before everything changed
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            At Highscope, we were required to complete two internships before graduating, so I went ahead and applied
            early. After finishing a Unity 3D bootcamp, I asked the company if I could intern with them, and they said
            yes. That's how I got my first internship as a Game Developer at VR Park.
          </p>

          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            Even though I only worked around 3–5 hours a week while in school, it lasted six months and taught me a lot.
            I learned how to work with people, handle tasks, and communicate better. More importantly, I met so many people
            in tech and realized this world is growing fast. It felt like the start of something big.
          </p>

          <div className="my-8 rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/article_media/journey/devnet-club-photo.jpeg"
              alt="Developer Network club photo"
              className="w-full object-cover"
            />
            <p className="text-slate-400 text-sm text-center mt-3 italic">
              Developer Network - the first tech club I founded at Highscope
            </p>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            During that same year, I also founded the first-ever tech club at Highscope called Developer Network. It started
            as a small group of students who wanted to learn coding, design, and video editing together, and it became a place
            where I could share what I was learning from bootcamps with my classmates.
          </p>

          <h2 id="the-big-decision" className="text-3xl font-bold text-red-400 mb-6 mt-12">The Big Decision</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            Halfway through grade 10, my dad came to me and gave me two choices. He said, "Do you want to finish high school
            here, or go to the U.S. and join a program where you can earn both a high school diploma and an associate's degree?"
          </p>

          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            I didn't even think twice. I said yes to the U.S. right away.
          </p>

          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            I wanted to try something new and see the world, even though I was only 15. Around that time, I also took the AP
            Computer Science A exam. Everyone thought I was crazy for taking it so early, and they were probably right because
            I got a 1 out of 5. But still, I took it. That experience taught me not to be afraid of trying.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/journey/whatcom.JPG"
                alt="College visit to Whatcom"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                The only photo we took together as a group during college visits - at Whatcom, no Bellevue College for some reason haha
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/journey/Leonardo_Edwin.JPG"
                alt="With Leonardo Edwin at Bellevue College"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                Suddenly meeting Leonardo Edwin at church 
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            In April, I flew to Seattle with my family to visit some colleges. We checked out Shoreline, Green River, Whatcom,
            Seattle Central, and Bellevue College. For some reason, Bellevue just felt right. One of the reasons I chose Bellevue
            was because of Leonardo Edwin's videos - he shared his experience as an Indonesian student at BC, and that really
            inspired me. So I applied, got accepted, said goodbye to my friends in Indonesia, and got ready for the next chapter
            of my life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/journey/Shirt_Signed.JPG"
                alt="Shirt signed by Highscope friends"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                My shirt signed by all my Highscope friends and mentors before leaving
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/journey/touchten.jpeg"
                alt="TouchTen Games internship"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                Team group photo at TouchTen Games during my internship
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            After my internship at VR Park ended in January 2023, I still had quite a bit of time before leaving for the U.S.
            So from June to September, I joined TouchTen Games as a guest student. I worked on game cutscenes for their mobile
            game Piper's Cat Café, which was such a fun experience. I got to work with professional developers and designers,
            and it gave me a glimpse of what it's like to be in the game industry.
          </p>

          <h2 id="starting-seattle" className="text-3xl font-bold text-red-400 mb-6 mt-12">Starting a New Life in Seattle</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            When I first moved to Seattle, I stayed with a host family. My parents helped me settle in, but once they left,
            reality hit. I was completely alone in a new country. I had to figure everything out — cooking, laundry, and public
            transport. I definitely took Indonesia for granted, but living alone made me grow up faster.
          </p>

          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            During my first week at Bellevue College, I met new friends, mostly Indonesians. One of them, Abraham, told me to
            join the BC Tech Club, so I did. Somehow, I became an officer during my first week. My first project was building a
            website, and I spent the whole night coding it at Abraham's house.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/journey/Website_Making.jpg"
                alt="Coding the BC Tech Club website"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                All-nighter coding the BC Tech Club website at Abraham's house
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/journey/Joe_Guan.JPG"
                alt="With friend Guan"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                With Abraham at a hackathon
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            <a href="https://www.linkedin.com/in/abraham-guan/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors underline">Abraham</a> became my mentor. He taught me so much, from tech stuff to life advice. He's now studying at UC Berkeley
            majoring in data science, and I'm really thankful for all the guidance he gave me back then.
          </p>

          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            That first quarter also brought something unexpected. I met a girl named <a href="https://www.linkedin.com/in/juwita-jessica-pangestu/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors underline">Jessica</a>. I was friends with her brother,
            and he invited her to church with us. That's how we met. Fast forward, she's my girlfriend now haha.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/journey/Juwi_1.jpg"
                alt="With Jessica"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                With Jessica - from church friends to something more
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/journey/Juwi_2.JPG"
                alt="Jessica and me"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                More memories together
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            But that quarter was also the hardest in a different way. My friend Caleb, the one who showed me that first website,
            passed away. It really shocked me. He was one of the main reasons I got into tech, and losing him so early made me
            realize how much this path meant to me. Since then, I've carried a small part of him in everything I do. Continuing
            this journey became my way to honor him.
          </p>

          <h2 id="bellevue-college" className="text-3xl font-bold text-red-400 mb-6 mt-12">Bellevue College Life</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/journey/Bellevue_College_Orientation_Photo.JPG"
                alt="Bellevue College orientation"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                Bellevue College orientation - the start of my community college journey
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/journey/Tech_Club.JPG"
                alt="BC Tech Club meeting"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                BC Tech Club meeting - where I became an officer in my first week
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            The next few quarters went by fast. I took more computer science and math classes and started planning the Bellevue
            College Hackathon — BC Hacks 2024.
          </p>

          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            By spring quarter, things got really intense. Between my classes and organizing the hackathon, my schedule was packed.
            But I learned how to manage time, worked with a team, and worked under pressure. It was one of the best experiences
            I've ever had.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/journey/bc-hacks-group-photo.JPG"
                alt="BC Hacks 2024 group photo"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                BC Hacks 2024 - one of the most rewarding experiences organizing this event
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/journey/BC_Hacks_Jess.JPG"
                alt="At BC Hacks with Jessica"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                At BC Hacks with Jessica
              </p>
            </div>
          </div>

          <div className="my-8 p-6 bg-blue-500/10 border border-blue-400/30 rounded-2xl">
            <p className="text-slate-300 text-lg mb-2">
              Want to read more about BC Hacks 2024?
            </p>
            <Link
              to="/blog/bc-hacks-2024"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-lg font-medium"
            >
              Read the full BC Hacks story →
            </Link>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            Around the same time, I also became the Secretary of the Bellevue Indonesian Club. It was a great way to stay connected
            to my Indonesian roots while living abroad, and I got to help organize events and build community among Indonesian students
            at Bellevue College.
          </p>

          <div className="my-8 rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/article_media/journey/Bellevue_Indo_Club.JPG"
              alt="Bellevue Indonesian Club"
              className="w-full object-cover"
            />
            <p className="text-slate-400 text-sm text-center mt-3 italic">
              With the Bellevue Indonesian Club - staying connected to my roots
            </p>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            Then came summer quarter, and for some reason, I decided to take four classes and do an internship at Stockbit as
            an AI Engineer. I honestly don't know what I was thinking. But it turned out fine — I finished with straight A's
            and learned a lot about AI, data, and automation.
          </p>

          <div className="my-8 rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/article_media/journey/Bibit-Group-Photo.jpeg"
              alt="Stockbit/Bibit internship team"
              className="w-full object-cover"
            />
            <p className="text-slate-400 text-sm text-center mt-3 italic">
              Internship at Stockbit/Bibit - summer of learning AI and fintech
            </p>
          </div>

          <h2 id="transferring-uw" className="text-3xl font-bold text-red-400 mb-6 mt-12">Transferring to UW</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            Fall and winter 2024 were all about transfer applications. I applied to 13 universities — all the UCs, Georgia Tech,
            and UW. Sadly, I couldn't apply to East Coast schools because my credits wouldn't transfer since I was still technically
            a high school student.
          </p>

          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            But it all worked out. I got into the University of Washington. I was rejected from UW Computer Science but got accepted
            into Informatics, and honestly, that was good enough for me. I even turned down UC Irvine's CS offer because UW just felt
            like home.
          </p>

          <div className="my-8 rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/article_media/journey/Informatics_Acceptance.jpg"
              alt="UW Informatics acceptance letter"
              className="w-full object-cover"
            />
            <p className="text-slate-400 text-sm text-center mt-3 italic">
              The acceptance letter that made it official - I'm a Husky!
            </p>
          </div>

          <h2 id="graduation" className="text-3xl font-bold text-red-400 mb-6 mt-12">Graduation from Bellevue College</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            A few months later, I graduated from Bellevue College.
          </p>

          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            Standing on that stage, holding my diploma, I couldn't help but think about how far I'd come. Two years earlier, I was
            a 15-year-old kid moving to a new country alone. That day, surrounded by friends, mentors, and family, it really hit me
            that I made it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/journey/Graduation_Peace.png"
                alt="Bellevue College graduation"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                Graduation day - two years condensed into one incredible journey
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/article_media/journey/Last_Pic_Hostfam.JPG"
                alt="Last photo with host family"
                className="w-full h-auto object-contain md:object-cover md:h-64"
              />
              <p className="text-slate-400 text-sm text-center mt-3 italic">
                Last photo with my host family before moving out
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            Now I'm a junior in Informatics, and working as an AI Research & Development Intern at Sector, a cybersecurity company.
            It's been a wild ride, but I wouldn't trade it for anything.
          </p>

          <div className="my-8 rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/article_media/journey/Joe_MaryGates_Hall.jpg"
              alt="At UW Mary Gates Hall"
              className="w-full object-cover"
            />
            <p className="text-slate-400 text-sm text-center mt-3 italic">
              At University of Washington's Mary Gates Hall - finally a Husky
            </p>
          </div>

          <h2 id="looking-back" className="text-3xl font-bold text-red-400 mb-6 mt-12">Looking Back</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            Sometimes I still can't believe how much has happened — from being that kid who played games all day, to studying abroad
            alone at 15, to now being at UW and working in AI.
          </p>

          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            Skipping two years of high school taught me a lot about independence, time, and how fast life moves when you take chances.
          </p>

          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            I didn't take the traditional path, but I'm glad I didn't. Everything that's happened — from Highscope to Bellevue College
            to UW — made me who I am today.
          </p>

          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            Thanks for reading.
          </p>
        </div>
      );

    // Add more article content here as you write them

    default:
      return (
        <div className="text-center py-20">
          <p className="text-slate-400 text-xl">Article content coming soon...</p>
        </div>
      );
  }
};

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.id === slug);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Also set on a slight delay to override any other scroll behavior
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 10);
    return () => clearTimeout(timer);
  }, [slug]);

  // If article doesn't exist, redirect to home
  if (!article) {
    return <Navigate to="/" replace />;
  }

  // SEO metadata
  const pageTitle = `${article.title} | Joseph Davis Chamdani`;
  const pageDescription = article.preview;
  const pageUrl = `https://joechamdani.com/blog/${article.id}`;
  const imageUrl = article.thumbnail
    ? `https://joechamdani.com/${article.thumbnail}`
    : 'https://joechamdani.com/og-image.png'; // fallback image

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={pageUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={imageUrl} />

        {/* Article specific tags */}
        <meta property="article:author" content="Joseph Davis Chamdani" />
        <meta property="article:published_time" content={article.date} />
        {article.tags && article.tags.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}
      </Helmet>

      <Navbar />

      {/* Article Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-32 pb-6 px-6"
      >
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/"
            state={{ scrollTo: "blog" }}
            className="inline-flex items-center text-slate-400 hover:text-blue-400 transition-colors mb-8 group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          {/* Article Metadata */}
          <div className="flex items-center gap-2 text-slate-400 mb-4">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">
              {article.location ? `${article.location} — ${article.date}` : article.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
            {article.title}
          </h1>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Thumbnail */}
          {article.thumbnail && (
            <a
              href={article.externalLinks?.[0]?.url || article.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-6 rounded-2xl overflow-hidden shadow-2xl hover:opacity-90 transition-opacity"
            >
              <img
                src={`/${article.thumbnail}`}
                alt={article.title}
                className="w-full object-cover"
              />
            </a>
          )}
        </div>
      </motion.div>

      {/* Article Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="pb-20 px-6"
      >
        {/* Center the content with max-w-4xl */}
        <div className="max-w-4xl mx-auto">
          {/* Main Content - Always centered */}
          <div>
            <ArticleContent articleId={article.id} />

          {/* External Links Section */}
          {(article.externalLinks || article.externalLink) && (
            <div className="mt-12 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Related Resources</h3>
              <div className="flex flex-col gap-3">
                {article.externalLinks ? (
                  article.externalLinks.map((link: any, index: number) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-lg"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      {link.text}
                    </a>
                  ))
                ) : (
                  <a
                    href={article.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-lg"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    {article.externalLinkText || 'View External Resource'}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Back to Blog Button */}
          <div className="mt-12 text-center">
            <Link
              to="/"
              state={{ scrollTo: "blog" }}
              className="inline-flex items-center px-6 py-3 bg-red-500/20 text-red-400 rounded-lg border border-red-400/30 hover:bg-red-500/30 hover:border-red-400/50 transition-all"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to All Articles
            </Link>
          </div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default ArticlePage;
