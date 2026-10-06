import React,{useEffect,useMemo,useState} from "react";
import {Activity,BarChart3,BookOpen,BrainCircuit,BriefcaseBusiness,ChevronRight,FileText,Gauge,GraduationCap,LayoutDashboard,Lightbulb,Menu,Search,Settings,Sparkles,Target,TrendingUp,Upload,UserRound,X,CheckCircle2,AlertTriangle,Clock3,Download,Mail,LockKeyhole,Eye,EyeOff,ArrowRight} from "lucide-react";
import {ResponsiveContainer,BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid,PieChart,Pie,Cell} from "recharts";

function Register({ onRegister, onBackToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${API}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        alert(result.message || "Unable to create account.");
        return;
      }

      alert("Account created successfully!");

      onRegister(result.user);

    } catch (error) {
      console.error(error);
      alert("Unable to connect to SkillSync server.");
    }
  }

  return (
    <div className="professionalLogin">
      <div className="loginContainer">

        {/* LEFT BRANDING */}
        <div className="loginBrand">
          <div className="brandTop">
            <div className="brandLogo">
              <BrainCircuit size={30} />
            </div>

            <div>
              <div className="brandName">SkillSync</div>
              <div className="brandTag">AI Platform</div>
            </div>
          </div>

          <div className="brandContent">
            <div className="brandBadge">
              <Sparkles size={15} />
              Build Your Future With AI
            </div>

            <h1>
              Start building your
              <span> future-ready skills.</span>
            </h1>

            <p>
              Create your SkillSync account and discover the skills,
              learning opportunities and industry requirements that
              matter for your career.
            </p>

            <div className="brandFeatures">
              <div>
                <CheckCircle2 size={19} />
                Personalized skill insights
              </div>

              <div>
                <CheckCircle2 size={19} />
                Industry-driven recommendations
              </div>

              <div>
                <CheckCircle2 size={19} />
                Career-ready learning
              </div>
            </div>
          </div>

          <div className="brandFooter">
            © 2026 SkillSync AI
          </div>
        </div>

        {/* REGISTER FORM */}
        <div className="loginPanel">
          <div className="loginBox">

            <div className="mobileLogo">
              <div className="brandLogo">
                <BrainCircuit size={26} />
              </div>

              <div>
                <div className="brandName">SkillSync</div>
                <div className="brandTag">AI Platform</div>
              </div>
            </div>

            <h2>Create your account</h2>

            <p className="loginDescription">
              Join SkillSync AI and start exploring industry skill intelligence.
            </p>

            <button
              type="button"
              className="googleButton"
              onClick={() =>
                alert("Google Sign-In will be connected next.")
              }
            >
              <span className="googleIcon">G</span>
              Continue with Google
            </button>

            <div className="loginDivider">
              <span>OR</span>
            </div>

            <form onSubmit={handleRegister}>

              <label>Full name</label>

              <div className="inputWrapper">
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>

              <label>Email address</label>

              <div className="inputWrapper">
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <label>Password</label>

              <div className="inputWrapper">
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>

              <label>Confirm password</label>

              <div className="inputWrapper">
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </div>

              <button className="loginButton" type="submit">
                Create account
                <ArrowRight size={18} />
              </button>

            </form>

            <p className="createAccount">
              Already have an account?
              <button
                type="button"
                onClick={onBackToLogin}
              >
                Sign in
              </button>
            </p>

            <p className="termsText">
              By creating an account, you agree to SkillSync's
              Terms of Service and Privacy Policy.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

function Login({ onLogin, onCreateAccount}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

async function handleLogin(e) {
  e.preventDefault();

  if (!email || !password) {
    alert("Please enter your email and password.");
    return;
  }

  try {
    const response = await fetch(`${API}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      alert(result.message || "Invalid email or password.");
      return;
    }

    localStorage.setItem("skillsync_token", result.token);
    localStorage.setItem("skillsync_user", JSON.stringify(result.user));

    onLogin(result.user);

  } catch (error) {
    console.error(error);
    alert("Unable to connect to SkillSync server.");
  }
}

  return (
    <div className="professionalLogin">
      <div className="loginContainer">

        {/* LEFT BRANDING SECTION */}
        <div className="loginBrand">
          <div className="brandTop">
            <div className="brandLogo">
              <BrainCircuit size={30} />
            </div>

            <div>
              <div className="brandName">SkillSync</div>
              <div className="brandTag">AI Platform</div>
            </div>
          </div>

          <div className="brandContent">
            <div className="brandBadge">
              <Sparkles size={15} />
              AI-Powered Skill Intelligence
            </div>

            <h1>
              Bridge the gap between
              <span> education & industry.</span>
            </h1>

            <p>
              Analyze industry requirements, identify skill gaps and build
              future-ready learning programs with SkillSync AI.
            </p>

            <div className="brandFeatures">
              <div>
                <CheckCircle2 size={19} />
                Industry skill analysis
              </div>

              <div>
                <CheckCircle2 size={19} />
                AI-powered recommendations
              </div>

              <div>
                <CheckCircle2 size={19} />
                Curriculum intelligence
              </div>
            </div>
          </div>

          <div className="brandFooter">
            © 2026 SkillSync AI
          </div>
        </div>

        {/* LOGIN SECTION */}
        <div className="loginPanel">
          <div className="loginBox">

            <div className="mobileLogo">
              <div className="brandLogo">
                <BrainCircuit size={26} />
              </div>
              <div>
                <div className="brandName">SkillSync</div>
                <div className="brandTag">AI Platform</div>
              </div>
            </div>

            <h2>Welcome back</h2>

            <p className="loginDescription">
              Sign in to continue to your SkillSync workspace.
            </p>

            <button
              type="button"
              className="googleButton"
              onClick={() =>
                alert("Google Sign-In will be connected next.")
              }
            >
              <span className="googleIcon">G</span>
              Continue with Google
            </button>

            <div className="loginDivider">
              <span>OR</span>
            </div>

            <form onSubmit={handleLogin}>

              <label>Email address</label>

              <div className="inputWrapper">
                <Mail size={18} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="passwordLabel">
                <label>Password</label>
                <button
                  type="button"
                  className="forgotButton"
                  onClick={() => alert("Password reset will be connected next.")}
                >
                  Forgot password?
                </button>
              </div>

              <div className="inputWrapper">
                <LockKeyhole size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="passwordToggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button className="loginButton" type="submit">
                Sign in
                <ArrowRight size={18} />
              </button>

            </form>

            <p className="createAccount">
              Don't have an account?
              <button type="button"
                onClick={() => {
  alert("Create Account button clicked");
  onCreateAccount();
}}
              >
                Create account
              </button>
            </p>

            <p className="termsText">
              By continuing, you agree to SkillSync's Terms of Service
              and Privacy Policy.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
const API="http://127.0.0.1:8000";                          
const fallback={
job_description:"We are looking for a Data Analyst who can work with Python, SQL, Excel and Power BI. The candidate should understand data analysis, statistics and data visualization. Experience with machine learning, cloud computing and Git/GitHub is an advantage. Strong communication and problem-solving skills are required.",
curriculum:"Programming with Python, Database Management and SQL, Statistics, Data Analysis, Web Technologies, Machine Learning fundamentals, Communication Skills, Software Engineering and practical laboratory training.",
job_skills:{Python:92,SQL:85,"Power BI":74,Excel:70,"Data Analysis":74,Statistics:70,"Data Visualization":70,"Machine Learning":62,"Cloud Computing":62,"Git/GitHub":62,Communication:62,"Problem Solving":62},
curriculum_skills:{Python:75,SQL:60,"Data Analysis":72,Statistics:68,"Machine Learning":35,Communication:55},
trends:[
{skill:"Python",demand:92,category:"Programming"},{skill:"SQL",demand:85,category:"Data"},
{skill:"Cloud Computing",demand:82,category:"Cloud"},{skill:"Machine Learning",demand:78,category:"AI/ML"},
{skill:"Power BI",demand:74,category:"Analytics"},{skill:"Data Visualization",demand:70,category:"Analytics"},
{skill:"Git/GitHub",demand:68,category:"Development"},{skill:"React",demand:65,category:"Web"}]};
const nav=[["dashboard","Dashboard",LayoutDashboard],["job","Job Analyzer",FileText],["curriculum","Curriculum",GraduationCap],["gap","Skill Gap",Target],["trends","Industry Trends",TrendingUp],["recommendations","AI Recommendations",Lightbulb],["profile","Student Profile",UserRound],["reports","Reports",BarChart3]];

function App(){
const savedUser = JSON.parse(localStorage.getItem("skillsync_user") || "null");
const [currentUser, setCurrentUser] = useState(savedUser);
 const [page,setPage]=useState("dashboard");
 const[mobileOpen,setMobileOpen]=useState(false);
 const [loggedIn, setLoggedIn] = useState(
  () => localStorage.getItem("skillsync_logged_in") === "true"
);
 const [authPage, setAuthPage] = useState("login");
 const [data,setData]=useState(fallback);
const [apiOnline,setApiOnline]=useState(false);
 useEffect(()=>{fetch(`${API}/api/demo`).then(r=>r.json()).then(d=>{setData(d);setApiOnline(true)}).catch(()=>setApiOnline(false))},[]);
 const gapData=useMemo(()=>[...new Set([...Object.keys(data.job_skills),...Object.keys(data.curriculum_skills)])].map(skill=>{let industry=data.job_skills[skill]||0,curriculum=data.curriculum_skills[skill]||0,gap=Math.max(industry-curriculum,0);return{skill,industry,curriculum,gap,level:gap>=35?"High":gap>=15?"Medium":"Low"}}).sort((a,b)=>b.gap-a.gap),[data]);
 const navigate=p=>{setPage(p);setMobileOpen(false);window.scrollTo({top:0,behavior:"smooth"})};
if (!loggedIn) {
  if (authPage === "register") {
    return (
      <Register
        onRegister={(user) => {
          setLoggedIn(true);
          setAuthPage("login");
        }}
        onBackToLogin={() => {
          setAuthPage("login");
        }}
      />
    );
  }

  return (
    <Login
    onLogin={(user) => {
  localStorage.setItem("skillsync_logged_in", "true");
  setLoggedIn(true);
  setCurrentUser(user);
  localStorage.setItem("skillsync_user", JSON.stringify(user));
}}
      onCreateAccount={() => {
        setAuthPage("register");
      }}
    />
  );
}
 return <div className="app">
  <aside className={`sidebar ${mobileOpen?"open":""}`}>
   <div className="brand"><div className="brandIcon"><BrainCircuit size={25}/></div><div><b>SkillSync</b><span>AI Platform</span></div><button className="mobileClose" onClick={()=>setMobileOpen(false)}><X/></button></div>
   <div className="navTitle">MAIN MENU</div><nav>{nav.map(([id,label,Icon])=><button key={id} className={page===id?"active":""} onClick={()=>navigate(id)}><Icon size={18}/><span>{label}</span>{page===id&&<ChevronRight className="navArrow" size={15}/>}</button>)}</nav>
   <div className="sidebarBottom"><div className="statusCard"><div className="statusDot"></div><div><strong>{apiOnline?"AI Engine Online":"Demo Mode"}</strong><small>{apiOnline?"FastAPI connected":"Backend can be started locally"}</small></div></div>
   <button
  className="settings"
  onClick={() => setPage("settings")}
>
  <Settings size={17} /> Settings
</button>
   <button
  className="settings"
  onClick={() => {
    localStorage.removeItem("skillsync_logged_in");
    localStorage.removeItem("skillsync_token");
    localStorage.removeItem("skillsync_user");
    setLoggedIn(false);
  }}
>
  Logout
</button></div>
  </aside>
  <main className="main"><header className="topbar"><button className="mobileMenu" onClick={()=>setMobileOpen(true)}><Menu/></button><div className="breadcrumb"><span>SkillSync AI</span><ChevronRight size={14}/><strong>{nav.find(x=>x[0]===page)?.[1]}</strong></div><div className="topActions"><div className="searchBox"><Search size={17}/><input placeholder="Search skills..."/></div><div className="avatar">
  {currentUser?.name
    ? currentUser.name.split(" ").map(word => word[0]).join("").toUpperCase()
    : "SR"}
</div></div></header>
   <div className="content">
    {page==="dashboard"&&<Dashboard data={data} gapData={gapData} navigate={navigate}/>}
    {page==="job"&&<Analyzer type="job" initial={data.job_description} onResult={skills=>setData(d=>({...d,job_skills:skills}))}/>}
    {page==="curriculum"&&<Analyzer type="curriculum" initial={data.curriculum} onResult={skills=>setData(d=>({...d,curriculum_skills:skills}))}/>}
    {page==="gap"&&<GapPage gapData={gapData}/>}
    {page==="trends"&&<Trends data={data.trends}/>}
    {page==="recommendations"&&<Recommendations gapData={gapData}/>}
    {page === "profile" && (
  <Profile
    currentUser={currentUser}
    setCurrentUser={setCurrentUser}
  />
)}
    {page==="reports"&&<Reports data={data} gapData={gapData}/>}
    {page==="settings" && (
  <div className="page">
    <PageHeader
      eyebrow="SETTINGS"
      title="Settings"
      desc="Manage your SkillSync AI account and preferences."
    />

    <section className="panel">
      <div className="panelHead">
        <div>
          <h3>Account Settings</h3>
          <p>Manage your account preferences.</p>
        </div>
      </div>

      <div style={{padding:"20px"}}>
        <p><strong>Account:</strong> SkillSync AI</p>
        <p><strong>Status:</strong> Active</p>
        <p><strong>Platform:</strong> SkillSync AI</p>
      </div>
    </section>
  </div>
)}
   </div>
  </main>
 </div>
}

function PageHeader({eyebrow,title,desc,action}){return <div className="pageHeader"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{desc}</p></div>{action}</div>}
function Stat({icon:Icon,label,value,delta,tone}){return <div className="stat"><div className={`statIcon ${tone}`}><Icon size={20}/></div><div><span>{label}</span><strong>{value}</strong><small>{delta}</small></div></div>}

function Dashboard({data,gapData,navigate}){
 const high=gapData.filter(x=>x.level==="High").length,avg=gapData.length?Math.round(gapData.reduce((a,x)=>a+x.gap,0)/gapData.length):0;
 return <>
 <PageHeader eyebrow="OVERVIEW" title="Industry–Academia Skill Intelligence" desc="Understand what employers need, compare it with your curriculum, and identify priority skill gaps." action={<button className="primary" onClick={()=>navigate("job")}><FileText size={17}/> Analyze a Job</button>}/>
 <div className="hero"><div className="heroText"><div className="heroBadge"><Sparkles size={14}/> AI-POWERED SKILL ANALYSIS</div><h2>Bridge the gap between <span>education</span> and industry.</h2><p> descriptions, extract in-demand skills, compare them with curriculum coverage and generate actionable recommendations.</p><button className="heroButton" onClick={()=>navigate("gap")}>View Skill Gap Analysis <ChevronRight size={17}/></button></div><div className="heroVisual"><div className="orbit o1"></div><div className="orbit o2"></div><div className="brain"><BrainCircuit size={58}/></div><div className="floatCard fc1"><Target size={16}/><span>Gap Detection</span><b>{high} high</b></div><div className="floatCard fc2"><TrendingUp size={16}/><span>Avg. Gap</span><b>{avg}%</b></div></div></div>
 <div className="statsGrid"><Stat icon={BriefcaseBusiness} label="Jobs Analyzed" value="1,240" delta="+18.4%" tone="blue"/><Stat icon={BrainCircuit} label="Skills Detected" value="86" delta="+12.2%" tone="purple"/><Stat icon={Target} label="Skill Gaps" value={gapData.length} delta="Needs review" tone="orange"/><Stat icon={Gauge} label="Alignment Score" value="72%" delta="+6.8%" tone="green"/></div>
 <div className="twoCol"><section className="panel"><div className="panelHead"><div><h3>Top Industry Skills</h3><p>Current demand from analyzed job descriptions</p></div><button className="linkBtn" onClick={()=>navigate("trends")}>View all <ChevronRight size={15}/></button></div><div className="skillBars">{data.trends.slice(0,6).map((x,i)=><div className="barRow" key={x.skill}><div className="barLabel"><span>{i+1}. {x.skill}</span><b>{x.demand}%</b></div><div className="barTrack"><div className="barFill" style={{width:`${x.demand}%`}}></div></div></div>)}</div></section>
 <section className="panel"><div className="panelHead"><div><h3>Priority Skill Gaps</h3><p>Skills needing curriculum attention</p></div><button className="linkBtn" onClick={()=>navigate("gap")}>Analyze <ChevronRight size={15}/></button></div><div className="gapList">{gapData.slice(0,5).map(x=><div className="gapItem" key={x.skill}><div className={`gapIcon ${x.level.toLowerCase()}`}>{x.level==="High"?<AlertTriangle size={17}/>:x.level==="Medium"?<Clock3 size={17}/>:<CheckCircle2 size={17}/>}</div><div className="gapInfo"><strong>{x.skill}</strong><span>Industry {x.industry}% · Curriculum {x.curriculum}%</span></div><div className={`pill ${x.level.toLowerCase()}`}>{x.gap}% gap</div></div>)}</div></section></div>
 <section className="panel"><div className="panelHead"><div><h3>How SkillSync Works</h3><p>From raw job descriptions to actionable curriculum insights</p></div></div><div className="steps">{[["01","Collect","Job descriptions & industry requirements"],["02","Extract","NLP identifies relevant skills"],["03","Compare","Industry demand vs curriculum"],["04","Recommend","Priority actions & training areas"]].map(([n,t,d])=><div className="step" key={n}><span>{n}</span><div><strong>{t}</strong><p>{d}</p></div></div>)}</div></section>
 </>}

function Analyzer({type,initial,onResult}){
 const isJob=type==="job";const [text,setText]=useState(initial),[skills,setSkills]=useState({}),[loading,setLoading]=useState(false),[done,setDone]=useState(false);
 async function analyze(){setLoading(true);try{const res=await fetch(`${API}/api/analyze-${isJob?"job":"curriculum"}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text})});if(!res.ok)throw new Error();const d=await res.json();setSkills(d.skills);onResult(d.skills)}catch{const map=isJob?fallback.job_skills:fallback.curriculum_skills,found={};Object.entries(map).forEach(([k,v])=>{if(text.toLowerCase().includes(k.toLowerCase().split("/")[0]))found[k]=v});setSkills(found);onResult(found)}setDone(true);setLoading(false)}
 return <><PageHeader eyebrow={isJob?"NLP ANALYZER":"ACADEMIC ANALYZER"} title={isJob?"Job Description Analyzer":"Curriculum Analyzer"} desc={isJob?"Paste a job description and let the NLP engine extract the skills employers are asking for.":"Enter your curriculum, syllabus or training content to identify the skills currently being taught."}/>
 <div className="analyzerGrid"><section className="panel"><div className="panelHead"><div><h3>{isJob?"Job Description":"Curriculum / Training Content"}</h3><p>{isJob?"Paste the text from an employer job posting.":"Paste subjects, syllabus topics, labs and training modules."}</p></div><span className="miniTag"><BrainCircuit size={13}/> NLP</span></div><textarea className="bigTextarea" value={text} onChange={e=>setText(e.target.value)} placeholder="Paste content here..."></textarea><div className="inputFooter"><span>{text.length} characters</span><button className="secondary"><Upload size={16}/> Upload File</button></div><button className="primary full" onClick={analyze} disabled={loading}>{loading?"Analyzing...":<><Sparkles size={17}/> Analyze {isJob?"Job":"Curriculum"}</>}</button></section>
 <section className="panel resultPanel"><div className="panelHead"><div><h3>Detected Skills</h3><p>{done?`${Object.keys(skills).length} relevant skills identified`:"Results will appear here after analysis"}</p></div>{done&&<span className="successTag"><CheckCircle2 size={14}/> Complete</span>}</div>{!done?<div className="emptyState"><BrainCircuit size={44}/><strong>Ready for analysis</strong><p>Click the button to run the skill extraction engine.</p></div>:<div className="detected">{Object.entries(skills).sort((a,b)=>b[1]-a[1]).map(([skill,score])=><div className="detectedItem" key={skill}><div className="skillTitle"><span>{skill}</span><b>{score}%</b></div><div className="barTrack"><div className="barFill" style={{width:`${score}%`}}></div></div><small>{score>=75?"Strong signal":score>=55?"Relevant signal":"Emerging signal"}</small></div>)}</div>}</section></div></>}

function GapPage({gapData}){
 const pie=[{name:"High",value:gapData.filter(x=>x.level==="High").length},{name:"Medium",value:gapData.filter(x=>x.level==="Medium").length},{name:"Low",value:gapData.filter(x=>x.level==="Low").length}],COLORS=["#f04438","#f59e0b","#20a36a"];
 return <><PageHeader eyebrow="CORE ANALYSIS" title="Skill Gap Analysis" desc="Compare the skills demanded by industry against the skills represented in the current curriculum." action={<button className="secondary" onClick={()=>window.print()}><Download size={16}/> Export Report</button>}/>
 <div className="gapSummary"><div className="summaryCard"><Target/><span>Skills Compared</span><strong>{gapData.length}</strong></div><div className="summaryCard high"><AlertTriangle/><span>High Priority</span><strong>{pie[0].value}</strong></div><div className="summaryCard medium"><Clock3/><span>Medium Priority</span><strong>{pie[1].value}</strong></div><div className="summaryCard low"><CheckCircle2/><span>Low Priority</span><strong>{pie[2].value}</strong></div></div>
 <div className="twoCol"><section className="panel"><div className="panelHead"><div><h3>Industry vs Curriculum</h3><p>Coverage percentage comparison</p></div></div><div className="chartBox"><ResponsiveContainer width="100%" height={330}><BarChart data={gapData.slice(0,8)} margin={{left:-15,right:10,top:10,bottom:60}}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="skill" angle={-35} textAnchor="end" interval={0} height={75}/><YAxis domain={[0,100]}/><Tooltip/><Bar dataKey="industry" name="Industry" fill="#315efb" radius={[5,5,0,0]}/><Bar dataKey="curriculum" name="Curriculum" fill="#a9b7d5" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div></section>
 <section className="panel"><div className="panelHead"><div><h3>Gap Distribution</h3><p>Priority classification</p></div></div><div className="pieWrap"><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={pie} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={65} outerRadius={95} paddingAngle={4}>{pie.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer><div className="legend">{pie.map((x,i)=><span key={x.name}><i style={{background:COLORS[i]}}></i>{x.name}: {x.value}</span>)}</div></div></section></div>
 <section className="panel"><div className="panelHead"><div><h3>Detailed Skill Gap Matrix</h3><p>Use this table during your project review to explain priority gaps.</p></div></div><div className="tableWrap"><table><thead><tr><th>Skill</th><th>Industry Demand</th><th>Curriculum</th><th>Gap</th><th>Priority</th></tr></thead><tbody>{gapData.map(x=><tr key={x.skill}><td><strong>{x.skill}</strong></td><td>{x.industry}%</td><td>{x.curriculum}%</td><td><b>{x.gap}%</b></td><td><span className={`pill ${x.level.toLowerCase()}`}>{x.level}</span></td></tr>)}</tbody></table></div></section></>}

function Trends({data}){return <><PageHeader eyebrow="MARKET INTELLIGENCE" title="Industry Skill Trends" desc="A view of the skills currently showing strong demand in the project’s analyzed job-market dataset."/><section className="panel"><div className="panelHead"><div><h3>Demand by Skill</h3><p>Higher score indicates stronger demand signal.</p></div></div><div className="chartBox"><ResponsiveContainer width="100%" height={390}><BarChart data={data} margin={{left:-15,right:20,top:10,bottom:70}}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="skill" angle={-35} textAnchor="end" interval={0} height={85}/><YAxis domain={[0,100]}/><Tooltip/><Bar dataKey="demand" fill="#315efb" radius={[7,7,0,0]}/></BarChart></ResponsiveContainer></div></section><div className="trendGrid">{data.map((x,i)=><div className="trendCard" key={x.skill}><div className="trendTop"><span className="trendRank">#{i+1}</span><span>{x.category}</span></div><h3>{x.skill}</h3><div className="trendScore">{x.demand}<small>/100</small></div><div className="barTrack"><div className="barFill" style={{width:`${x.demand}%`}}></div></div><p>{x.demand>=80?"Very high demand":x.demand>=70?"High demand":"Growing demand"}</p></div>)}</div></>}

function Recommendations({gapData}){const high=gapData.filter(x=>x.gap>=35),medium=gapData.filter(x=>x.gap>=15&&x.gap<35),recs=[...high.map(x=>({level:"High Priority",skill:x.skill,text:`Add practical training and assessment coverage for ${x.skill}. Industry demand is ${x.industry}% while curriculum coverage is ${x.curriculum}%.`})),...medium.map(x=>({level:"Medium Priority",skill:x.skill,text:`Strengthen ${x.skill} through projects, labs or updated learning modules to reduce the ${x.gap}% gap.`}))];return <><PageHeader eyebrow="AI INSIGHTS" title="AI Recommendations" desc="Actionable suggestions generated from the detected industry–curriculum skill gaps." action={<span className="aiBadge"><Sparkles size={15}/> Recommendation Engine</span>}/><div className="recommendHero"><div className="recommendIcon"><BrainCircuit size={34}/></div><div><h2>Curriculum improvement plan</h2><p>The highest-impact changes should target skills where industry demand significantly exceeds current curriculum coverage.</p></div></div><div className="recommendList">{recs.length?recs.map((r,i)=><div className="recommendCard" key={r.skill}><div className="recNumber">{String(i+1).padStart(2,"0")}</div><div className="recBody"><div><span className="pill high">{r.level}</span><h3>{r.skill}</h3></div><p>{r.text}</p><div className="recActions"><span><BookOpen size={15}/> Curriculum module</span><span><Activity size={15}/> Practical project</span><span><BriefcaseBusiness size={15}/> Industry exposure</span></div></div></div>):<div className="emptyState"><CheckCircle2 size={44}/><strong>Good alignment</strong><p>No major recommendations found.</p></div>}</div></>}

function Profile({ currentUser, setCurrentUser
}) {
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: currentUser?.name || "Student",
    year: currentUser?.year || "Final Year",
    branch: currentUser?.branch || "Computer Science & Engineering",
    skills: currentUser?.skills || "Data Analytics, AI / ML, Software"
  });
  const skills = [
    ["Python", 82],
    ["SQL", 74],
    ["Data Analysis", 78],
    ["Machine Learning", 55],
    ["Power BI", 45],
    ["Cloud Computing", 32]
  ];

  const name = currentUser?.name || "Student";

  const initials = name
    .split(" ")
    .filter(Boolean)
    .map(word => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <PageHeader
        eyebrow="STUDENT PROFILE"
        title="My Skill Profile"
        desc="A student-facing view for comparing current capabilities with target roles."
      />

      <section className="panel">
        <div className="profileHead">
          <div className="profileAvatar">
            {initials || "SR"}
          </div>

          <div>
  <h2>{form.name}</h2>

  <p>
    {form.year} · {form.branch}
  </p>

  <div className="profileTags">
    {form.skills.split(",").map((skill, index) => (
      <span key={index}>{skill.trim()}</span>
    ))}
  </div>
</div>

          <button
            className="settings"
            onClick={() => {
  const newName = window.prompt(
    "Enter your full name:",
    currentUser?.name || "Student"
  );

  if (!newName || !newName.trim()) return;

  const newYear = window.prompt(
    "Enter your year:",
    currentUser?.year || "Final Year"
  );

  const newBranch = window.prompt(
    "Enter your branch:",
    currentUser?.branch || "Computer Science & Engineering"
  );

  const newSkills = window.prompt(
    "Enter your skills/interests:",
    currentUser?.skills || "Data Analytics, AI / ML, Software"
  );

  const updatedUser = {
    ...currentUser,
    name: newName.trim(),
    year: newYear?.trim() || "Final Year",
    branch: newBranch?.trim() || "Computer Science & Engineering",
    skills: newSkills?.trim() || "Data Analytics, AI / ML, Software"
  };

  localStorage.setItem(
    "skillsync_user",
    JSON.stringify(updatedUser)
  );

  setCurrentUser(updatedUser);
}}      
          >
            <Settings size={16} />
            Edit Profile
          </button>
        </div>
      </section>

      <div className="profileGrid">
        <section className="panel">
          <div className="panelHead">
            <div>
              <h3>Current Skills</h3>
              <p>Self-assessment / project-based profile</p>
            </div>
          </div>

          {skills.map(([skill, value]) => (
            <div className="skillBar" key={skill}>
              <div className="skillBarTop">
                <strong>{skill}</strong>
                <span>{value}%</span>
              </div>

              <div className="bar">
                <div
                  className="barFill"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </section>

        <section className="panel">
          <div className="panelHead">
            <div>
              <h3>Target Role Match</h3>
              <p>Based on current skill coverage</p>
            </div>
          </div>

          <div className="profileScore">
            <strong>68%</strong>
            <span>Target role match</span>
          </div>

          <h4>Suggested next skills</h4>

          <div className="suggestions">
            <p>✓ Cloud Computing</p>
            <p>✓ Power BI</p>
            <p>✓ Advanced SQL</p>
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panelHead">
          <div>
            <h3>Profile Report</h3>
            <p>Generate a printable version of your skill profile.</p>
          </div>

          <button
            className="primary"
            onClick={() => window.print()}
          >
            <Download size={16} />
            Print / Save PDF
          </button>
        </div>
      </section>
    </>
  );
}

function Reports({data,gapData}){const avg=gapData.length?Math.round(gapData.reduce((a,x)=>a+x.gap,0)/gapData.length):0;return <><PageHeader eyebrow="PROJECT REPORT" title="Analysis Report" desc="A presentation-ready summary of the current SkillSync analysis." action={<button className="primary" onClick={()=>window.print()}><Download size={16}/> Print / Save PDF</button>}/><section className="reportHero"><div><span>SKILLSYNC AI</span><h2>Industry–Academia Skill Gap Report</h2><p>Generated from job-market requirements and curriculum analysis.</p></div><div className="reportScore"><strong>{72-Math.min(avg,20)}%</strong><span>Alignment</span></div></section><div className="statsGrid"><Stat icon={BriefcaseBusiness} label="Job Dataset" value="1,240" delta="Analyzed postings" tone="blue"/><Stat icon={BrainCircuit} label="Skills" value={Object.keys(data.job_skills).length} delta="Detected" tone="purple"/><Stat icon={Target} label="Avg Gap" value={`${avg}%`} delta="Across compared skills" tone="orange"/><Stat icon={Gauge} label="Status" value="Active" delta="Continuous monitoring" tone="green"/></div><section className="panel"><div className="panelHead"><div><h3>Executive Findings</h3></div></div><ul className="findings"><li>Technology and employer expectations are changing continuously, requiring regular skill-gap analysis.</li><li>Skills with the largest gaps should receive priority in curriculum and practical-training updates.</li><li>NLP-style extraction makes it possible to process many job descriptions and identify repeated skill requirements.</li><li>The analysis can support stronger industry–academic collaboration and student employability.</li></ul></section></>}

export default App;
