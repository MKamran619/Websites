import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { RouterLink } from "@angular/router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: "app-portfolio",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Premium Hero Section -->
    <section class="portfolio-hero">
      <div class="hero-bg-effects">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="grid-pattern"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-icon">🏆</span>
            <span>Proven Results for Businesses Worldwide</span>
          </div>
          <h1 class="hero-title">
            <span class="gradient-text">Case Studies</span> &<br />
            Success Stories
          </h1>
          <p class="hero-subtitle">
            Explore how we've helped businesses like yours achieve measurable
            results through innovative technology solutions. Real projects, real
            impact.
          </p>
        </div>
      </div>
    </section>

    <!-- Case Studies -->
    <section class="portfolio-content">
      <div class="container">
        <div
          class="case-study"
          *ngFor="let study of visibleCaseStudies; let i = index"
          [class.reverse]="i % 2 !== 0"
        >
          <div class="case-study-content">
            <div class="study-header">
              <span class="industry-badge">{{ study.industry }}</span>
              <h2>{{ study.title }}</h2>
              <p class="company">{{ study.company }}</p>
            </div>

            <div class="study-section challenge">
              <div class="section-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </div>
              <div class="section-content">
                <h3>The Challenge</h3>
                <p>{{ study.challenge }}</p>
              </div>
            </div>

            <div class="study-section solution">
              <div class="section-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                  />
                </svg>
              </div>
              <div class="section-content">
                <h3>Our Solution</h3>
                <p>{{ study.solution }}</p>
              </div>
            </div>

            <div class="results">
              <h3>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
                Measurable Results
              </h3>
              <div class="results-grid">
                <div class="result-item" *ngFor="let result of study.results">
                  <div class="result-metric">{{ result.metric }}</div>
                  <p>{{ result.description }}</p>
                </div>
              </div>
            </div>

            <div class="technologies">
              <h3>Tech Stack</h3>
              <div class="tech-tags">
                <span
                  class="tech-tag"
                  *ngFor="let tech of study.technologies"
                  >{{ tech }}</span
                >
              </div>
            </div>
          </div>

          <div class="case-study-visual">
            <div class="visual-card">
              <div class="visual-icon">{{ study.icon }}</div>
              <div class="visual-label">{{ study.projectType }}</div>
              <div class="visual-timeline">
                <span class="timeline-item">
                  <strong>Duration:</strong> {{ study.duration }}
                </span>
                <span class="timeline-item">
                  <strong>Team:</strong> {{ study.team }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="load-more-container"
          *ngIf="
            !showAllCaseStudies && caseStudies.length > visibleCaseStudiesCount
          "
        >
          <button
            class="btn btn-outline load-more-btn"
            (click)="loadMoreCaseStudies()"
          >
            <span>More Success Stories</span>
            <span class="remaining-count"
              >({{ caseStudies.length - visibleCaseStudiesCount }} more)</span
            >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Impact Stats -->
    <section class="portfolio-stats">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Impact Summary</span>
          <h2 class="section-title">The Numbers Speak for Themselves</h2>
        </div>
        <div class="stats-grid">
          <div class="stat-card" *ngFor="let stat of impactStats">
            <div class="stat-icon">{{ stat.icon }}</div>
            <div class="stat-number">{{ stat.number }}</div>
            <p class="stat-label">{{ stat.label }}</p>
            <p class="stat-description">{{ stat.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Industries Served -->
    <section class="industries-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Industries Served</span>
          <h2 class="section-title">Expertise Across Sectors</h2>
          <p class="section-subtitle">
            Delivering tailored solutions for diverse industries
          </p>
        </div>
        <div class="industries-grid">
          <div class="industry-card" *ngFor="let industry of industries">
            <div class="industry-icon">{{ industry.icon }}</div>
            <h3>{{ industry.name }}</h3>
            <p>{{ industry.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Client Testimonial -->
    <section class="testimonial-section">
      <div class="container">
        <div class="testimonial-card">
          <div class="quote-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z"
              ></path>
              <path
                d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
              ></path>
            </svg>
          </div>
          <blockquote>
            "Working with ApnaKam was a game-changer for our business. They
            transformed our legacy systems into a modern, scalable platform that
            reduced our operational costs by 40% and improved customer
            satisfaction scores dramatically."
          </blockquote>
          <div class="testimonial-author">
            <div class="author-avatar">JR</div>
            <div class="author-info">
              <span class="author-name">James Richardson</span>
              <span class="author-title">CTO, Fortune 500 Retail Company</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="cta-content">
            <h2 class="cta-title">Ready to Write Your Success Story?</h2>
            <p class="cta-text">
              Every case study started with a conversation. Let's discuss how we
              can transform your challenges into measurable results.
            </p>
            <div class="cta-buttons">
              <a routerLink="/contact" class="btn btn-primary btn-lg">
                <span>Start Your Project</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a routerLink="/services" class="btn btn-secondary btn-lg">
                <span>View Services</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ["./portfolio.component.scss"],
})
export class PortfolioComponent implements OnInit {
  private isBrowser: boolean;

  showAllCaseStudies = false;
  visibleCaseStudiesCount = 6;

  get visibleCaseStudies() {
    return this.showAllCaseStudies
      ? this.caseStudies
      : this.caseStudies.slice(0, this.visibleCaseStudiesCount);
  }

  impactStats = [
    {
      icon: "🚀",
      number: "50+",
      label: "Projects Delivered",
      description: "Successfully completed enterprise projects",
    },
    {
      icon: "📈",
      number: "3x",
      label: "Performance Gain",
      description: "Average improvement in system performance",
    },
    {
      icon: "💰",
      number: "40%",
      label: "Cost Reduction",
      description: "Average savings in operational costs",
    },
    {
      icon: "⭐",
      number: "4.9/5",
      label: "Client Rating",
      description: "Average satisfaction score",
    },
  ];

  industries = [
    {
      icon: "🛍️",
      name: "E-Commerce & Retail",
      description: "Online stores and retail platforms",
    },
    {
      icon: "💼",
      name: "Financial Services",
      description: "Banks, insurance, and fintech",
    },
    {
      icon: "🏥",
      name: "Healthcare",
      description: "Medical systems and health tech",
    },
    {
      icon: "🏭",
      name: "Manufacturing",
      description: "Industrial automation and IoT",
    },
    {
      icon: "📦",
      name: "Logistics",
      description: "Supply chain and delivery systems",
    },
    {
      icon: "🎓",
      name: "Education",
      description: "E-learning and EdTech platforms",
    },
  ];

  caseStudies = [
    {
      title: "E-Commerce Platform Modernization",
      company: "Fortune 500 Retail Company",
      industry: "Retail & E-Commerce",
      icon: "🛍️",
      projectType: "Platform Modernization",
      duration: "8 months",
      team: "4 developers",
      challenge:
        "Legacy monolithic e-commerce platform causing slow deployments, scaling issues during peak seasons, and poor mobile experience leading to 35% cart abandonment.",
      solution:
        "Implemented microservices architecture with Angular PWA frontend, Node.js backend, and Azure cloud infrastructure. Introduced CI/CD pipelines, containerization with Kubernetes, and implemented a headless commerce approach.",
      results: [
        { metric: "300%", description: "Faster page load times" },
        { metric: "10x", description: "Peak traffic capacity" },
        { metric: "50%", description: "Reduced cart abandonment" },
        { metric: "$2M", description: "Annual savings" },
      ],
      technologies: [
        "Angular",
        "Node.js",
        "Docker",
        "Kubernetes",
        "Azure",
        "PostgreSQL",
        "Redis",
      ],
    },
    {
      title: "Enterprise CRM System Integration",
      company: "B2B SaaS Company",
      industry: "Technology",
      icon: "📊",
      projectType: "System Integration",
      duration: "6 months",
      team: "3 developers",
      challenge:
        "Multiple disconnected systems causing data silos, hours of manual data entry, and limited real-time reporting capabilities affecting sales team productivity.",
      solution:
        "Built unified API layer with .NET Core, created real-time Power BI dashboards, and implemented automated workflows with Azure Logic Apps to integrate 5 disparate systems.",
      results: [
        { metric: "75%", description: "Less manual data entry" },
        { metric: "Real-time", description: "Cross-system sync" },
        { metric: "60%", description: "Faster reporting" },
        { metric: "$1.5M", description: "Revenue increase" },
      ],
      technologies: [
        ".NET Core",
        "Angular",
        "SQL Server",
        "Azure Service Bus",
        "Power BI",
        "Azure Logic Apps",
      ],
    },
    {
      title: "Legacy System Modernization",
      company: "Insurance Industry Leader",
      industry: "Insurance & Finance",
      icon: "🏢",
      projectType: "Digital Transformation",
      duration: "18 months",
      team: "6 developers",
      challenge:
        "20-year-old mainframe system with $500K annual licensing costs, difficulty hiring specialized talent, and 6-month feature deployment cycles limiting market competitiveness.",
      solution:
        "Systematically migrated monolithic COBOL application to .NET microservices with Angular frontend using strangler fig pattern, maintaining zero downtime throughout migration.",
      results: [
        { metric: "$5M", description: "3-year savings" },
        { metric: "40x", description: "Faster deployments" },
        { metric: "200+", description: "Dev talent pool access" },
        { metric: "99.99%", description: "System uptime" },
      ],
      technologies: [
        ".NET Core",
        "Angular",
        "Azure",
        "Docker",
        "PostgreSQL",
        "Event Sourcing",
        "Kafka",
      ],
    },
    {
      title: "Real-Time Analytics Platform",
      company: "Financial Services Company",
      industry: "Financial Services",
      icon: "📈",
      projectType: "Data Platform",
      duration: "10 months",
      team: "5 developers",
      challenge:
        "Batch-based analytics system with 24-hour data lag causing delayed business insights, missed trading opportunities, and inability to detect fraud in real-time.",
      solution:
        "Built real-time streaming data pipeline with Apache Kafka, created interactive Angular dashboards, implemented ML-powered anomaly detection, and deployed on AWS for global scale.",
      results: [
        { metric: "100x", description: "Faster data processing" },
        { metric: "Real-time", description: "Fraud detection" },
        { metric: "$800K", description: "Infrastructure savings" },
        { metric: "30%", description: "Revenue increase" },
      ],
      technologies: [
        "Node.js",
        "Angular",
        "Apache Kafka",
        "Elasticsearch",
        "AWS",
        "Python",
        "TensorFlow",
      ],
    },
    {
      title: "Healthcare Patient Portal",
      company: "Regional Hospital Network",
      industry: "Healthcare",
      icon: "🏥",
      projectType: "Patient Experience",
      duration: "12 months",
      team: "5 developers",
      challenge:
        "Fragmented patient experience with separate portals for appointments, records, and billing. Low patient engagement and high call center volumes for routine inquiries.",
      solution:
        "Built unified HIPAA-compliant patient portal with Angular frontend, secure .NET backend, integrated with Epic EHR via FHIR APIs, and added telehealth capabilities.",
      results: [
        { metric: "85%", description: "Patient adoption rate" },
        { metric: "60%", description: "Fewer call center calls" },
        { metric: "4.8/5", description: "Patient satisfaction" },
        { metric: "50%", description: "Faster appointment booking" },
      ],
      technologies: [
        "Angular",
        ".NET Core",
        "Azure",
        "FHIR APIs",
        "Epic Integration",
        "SQL Server",
        "WebRTC",
      ],
    },
    {
      title: "Supply Chain Optimization",
      company: "Global Manufacturing Corp",
      industry: "Manufacturing",
      icon: "🏭",
      projectType: "IoT & Analytics",
      duration: "14 months",
      team: "7 developers",
      challenge:
        "No real-time visibility into supply chain, frequent stockouts and overstock situations, manual demand forecasting causing $3M annually in carrying costs.",
      solution:
        "Implemented IoT sensors across warehouses, built real-time tracking dashboard with Angular, deployed ML-based demand forecasting, and automated reorder processes.",
      results: [
        { metric: "35%", description: "Inventory reduction" },
        { metric: "95%", description: "Order fulfillment rate" },
        { metric: "$2.5M", description: "Annual savings" },
        { metric: "Real-time", description: "Supply chain visibility" },
      ],
      technologies: [
        "Angular",
        "Node.js",
        "AWS IoT",
        "Python",
        "TensorFlow",
        "PostgreSQL",
        "Grafana",
      ],
    },
    {
      title: "EdTech Learning Platform",
      company: "Online Education Startup",
      industry: "Education",
      icon: "🎓",
      projectType: "Platform Development",
      duration: "9 months",
      team: "4 developers",
      challenge:
        "Needed to launch competitive online learning platform from scratch with live classes, course management, and progress tracking to compete with established players.",
      solution:
        "Built full-featured LMS with Angular frontend, Node.js backend, integrated video streaming, gamification features, and AI-powered personalized learning paths.",
      results: [
        { metric: "50K+", description: "Active students" },
        { metric: "92%", description: "Course completion rate" },
        { metric: "4.9/5", description: "App store rating" },
        { metric: "$5M", description: "First-year revenue" },
      ],
      technologies: [
        "Angular",
        "Node.js",
        "MongoDB",
        "AWS",
        "WebRTC",
        "Redis",
        "Stripe",
      ],
    },
    {
      title: "Fintech Payment Gateway",
      company: "Digital Payments Startup",
      industry: "Financial Services",
      icon: "💳",
      projectType: "Payment Infrastructure",
      duration: "11 months",
      team: "6 developers",
      challenge:
        "Needed PCI-DSS compliant payment processing system to handle high transaction volumes with sub-second latency and 99.99% uptime requirements.",
      solution:
        "Architected microservices-based payment gateway with .NET Core, implemented distributed caching, built fraud detection ML models, and deployed multi-region on Azure.",
      results: [
        { metric: "10M+", description: "Monthly transactions" },
        { metric: "99.99%", description: "System uptime" },
        { metric: "<100ms", description: "Transaction latency" },
        { metric: "0.01%", description: "Fraud rate" },
      ],
      technologies: [
        ".NET Core",
        "Angular",
        "Azure",
        "Redis",
        "Kafka",
        "PostgreSQL",
        "ML.NET",
      ],
    },
    {
      title: "Restaurant Chain POS System",
      company: "National Restaurant Group",
      industry: "Hospitality",
      icon: "🍽️",
      projectType: "Point of Sale",
      duration: "10 months",
      team: "5 developers",
      challenge:
        "Outdated POS system causing slow order processing, inventory discrepancies, and no integration with online ordering platforms.",
      solution:
        "Built cloud-based POS with real-time inventory sync, integrated with DoorDash/UberEats APIs, and implemented AI-driven demand forecasting.",
      results: [
        { metric: "40%", description: "Faster order processing" },
        { metric: "25%", description: "Reduced food waste" },
        { metric: "200+", description: "Locations deployed" },
        { metric: "$3M", description: "Annual savings" },
      ],
      technologies: [
        "Angular",
        "Node.js",
        "MongoDB",
        "AWS",
        "Redis",
        "GraphQL",
        "React Native",
      ],
    },
    {
      title: "Insurance Claims Automation",
      company: "Top 10 Insurance Provider",
      industry: "Insurance",
      icon: "📋",
      projectType: "Process Automation",
      duration: "12 months",
      team: "8 developers",
      challenge:
        "Manual claims processing taking 15+ days on average, high error rates, and customer complaints about lack of transparency.",
      solution:
        "Implemented AI-powered claims assessment, automated document processing with OCR, and built customer self-service portal with real-time status tracking.",
      results: [
        { metric: "80%", description: "Faster claims processing" },
        { metric: "95%", description: "Accuracy rate" },
        { metric: "45%", description: "Cost reduction" },
        { metric: "4.7/5", description: "Customer satisfaction" },
      ],
      technologies: [
        ".NET Core",
        "Angular",
        "Azure Cognitive Services",
        "SQL Server",
        "Power Automate",
        "Cosmos DB",
      ],
    },
    {
      title: "Smart City Traffic Management",
      company: "Metropolitan City Government",
      industry: "Government",
      icon: "🚦",
      projectType: "IoT Platform",
      duration: "18 months",
      team: "10 developers",
      challenge:
        "Growing traffic congestion costing the city $50M annually in lost productivity, outdated traffic signal timing, and no real-time monitoring.",
      solution:
        "Deployed IoT sensors at 500+ intersections, built AI-driven traffic optimization, and created real-time monitoring dashboard for city operators.",
      results: [
        { metric: "30%", description: "Reduced congestion" },
        { metric: "22%", description: "Lower emissions" },
        { metric: "$15M", description: "Annual savings" },
        { metric: "500+", description: "Connected intersections" },
      ],
      technologies: [
        "Python",
        "Angular",
        "TensorFlow",
        "AWS IoT",
        "Kafka",
        "PostgreSQL",
        "Grafana",
      ],
    },
    {
      title: "Telehealth Platform",
      company: "Healthcare Startup",
      industry: "Healthcare",
      icon: "👨‍⚕️",
      projectType: "Platform Development",
      duration: "8 months",
      team: "6 developers",
      challenge:
        "COVID-19 pandemic created urgent need for virtual care platform with video consultations, prescription management, and EHR integration.",
      solution:
        "Built HIPAA-compliant telehealth platform with WebRTC video, e-prescribing integration, and seamless Epic/Cerner EHR connectivity.",
      results: [
        { metric: "100K+", description: "Monthly consultations" },
        { metric: "4.9/5", description: "Patient rating" },
        { metric: "85%", description: "First-visit resolution" },
        { metric: "$20M", description: "Series B funding" },
      ],
      technologies: [
        "Angular",
        "Node.js",
        "WebRTC",
        "AWS",
        "HL7 FHIR",
        "PostgreSQL",
        "Twilio",
      ],
    },
    {
      title: "Fleet Management System",
      company: "Logistics Enterprise",
      industry: "Transportation",
      icon: "🚛",
      projectType: "IoT & Analytics",
      duration: "14 months",
      team: "7 developers",
      challenge:
        "No real-time visibility into 2,000+ vehicle fleet, fuel theft issues, and inefficient route planning costing millions annually.",
      solution:
        "Implemented GPS tracking with telematics, built AI-powered route optimization, and created predictive maintenance system using vehicle sensor data.",
      results: [
        { metric: "18%", description: "Fuel savings" },
        { metric: "25%", description: "More deliveries/day" },
        { metric: "$4M", description: "Annual savings" },
        { metric: "40%", description: "Less vehicle downtime" },
      ],
      technologies: [
        "Angular",
        ".NET Core",
        "Azure IoT",
        "ML.NET",
        "SQL Server",
        "SignalR",
        "Power BI",
      ],
    },
    {
      title: "Digital Banking Platform",
      company: "Regional Credit Union",
      industry: "Banking",
      icon: "🏦",
      projectType: "Digital Transformation",
      duration: "16 months",
      team: "9 developers",
      challenge:
        "Legacy core banking system limiting digital capabilities, losing younger customers to fintech competitors, and high operational costs.",
      solution:
        "Built modern digital banking platform with mobile-first design, integrated with core banking via APIs, and added features like instant transfers and budgeting tools.",
      results: [
        { metric: "150%", description: "Mobile adoption increase" },
        { metric: "60%", description: "Fewer branch visits" },
        { metric: "35K", description: "New accounts" },
        { metric: "$2M", description: "Annual savings" },
      ],
      technologies: [
        "Angular",
        ".NET Core",
        "Azure",
        "Plaid",
        "SQL Server",
        "Redis",
        "Ionic",
      ],
    },
    {
      title: "HR & Talent Management System",
      company: "Fortune 100 Corporation",
      industry: "Enterprise",
      icon: "👥",
      projectType: "Enterprise Software",
      duration: "20 months",
      team: "12 developers",
      challenge:
        "Fragmented HR systems across 50+ countries, compliance challenges, and poor employee experience affecting talent retention.",
      solution:
        "Built unified global HR platform with localization for 30+ countries, integrated payroll systems, and implemented AI-powered talent matching.",
      results: [
        { metric: "200K+", description: "Employees onboarded" },
        { metric: "50%", description: "Faster hiring" },
        { metric: "30%", description: "Better retention" },
        { metric: "$10M", description: "Annual savings" },
      ],
      technologies: [
        "Angular",
        ".NET Core",
        "Azure",
        "Workday Integration",
        "SQL Server",
        "Power BI",
        "Azure AD",
      ],
    },
    {
      title: "Property Management Platform",
      company: "Real Estate Investment Trust",
      industry: "Real Estate",
      icon: "🏢",
      projectType: "Platform Development",
      duration: "11 months",
      team: "5 developers",
      challenge:
        "Managing 500+ commercial properties with spreadsheets, tenant communication issues, and no visibility into maintenance requests.",
      solution:
        "Built comprehensive property management platform with tenant portal, automated rent collection, and IoT-enabled building management.",
      results: [
        { metric: "98%", description: "Rent collection rate" },
        { metric: "60%", description: "Faster maintenance" },
        { metric: "500+", description: "Properties managed" },
        { metric: "$5M", description: "Revenue increase" },
      ],
      technologies: [
        "Angular",
        "Node.js",
        "PostgreSQL",
        "AWS",
        "Stripe",
        "SendGrid",
        "IoT sensors",
      ],
    },
    {
      title: "Legal Document Automation",
      company: "Top 50 Law Firm",
      industry: "Legal",
      icon: "⚖️",
      projectType: "AI Automation",
      duration: "9 months",
      team: "4 developers",
      challenge:
        "Associates spending 60% of time on document review, high billing disputes, and inconsistent contract quality across offices.",
      solution:
        "Implemented AI-powered contract analysis, built template-based document generation, and created automated billing reconciliation system.",
      results: [
        { metric: "70%", description: "Less review time" },
        { metric: "99%", description: "Contract accuracy" },
        { metric: "$8M", description: "Additional billable hours" },
        { metric: "40%", description: "Faster turnaround" },
      ],
      technologies: [
        "Python",
        "Angular",
        "Azure OpenAI",
        "Elasticsearch",
        ".NET Core",
        "SQL Server",
        "DocuSign",
      ],
    },
    {
      title: "Energy Trading Platform",
      company: "Energy Trading Firm",
      industry: "Energy",
      icon: "⚡",
      projectType: "Trading System",
      duration: "15 months",
      team: "8 developers",
      challenge:
        "Legacy trading system couldn't handle market volatility, slow execution causing missed opportunities, and regulatory compliance gaps.",
      solution:
        "Built high-frequency trading platform with sub-millisecond latency, real-time risk management, and automated regulatory reporting.",
      results: [
        { metric: "<1ms", description: "Trade execution" },
        { metric: "99.999%", description: "System uptime" },
        { metric: "35%", description: "Trading volume increase" },
        { metric: "$50M", description: "Annual profit increase" },
      ],
      technologies: [
        ".NET Core",
        "Angular",
        "Kafka",
        "Redis",
        "PostgreSQL",
        "TimescaleDB",
        "Kubernetes",
      ],
    },
    {
      title: "Pharmaceutical R&D Platform",
      company: "Biotech Company",
      industry: "Pharmaceutical",
      icon: "💊",
      projectType: "Research Platform",
      duration: "18 months",
      team: "10 developers",
      challenge:
        "Clinical trial data scattered across systems, slow drug discovery process, and difficulty meeting FDA submission requirements.",
      solution:
        "Built unified research platform with ML-powered drug candidate screening, automated FDA submission generation, and real-time trial monitoring.",
      results: [
        { metric: "40%", description: "Faster drug discovery" },
        { metric: "100%", description: "FDA compliance" },
        { metric: "3", description: "Drugs fast-tracked" },
        { metric: "$100M+", description: "R&D savings" },
      ],
      technologies: [
        "Python",
        "Angular",
        ".NET Core",
        "Azure",
        "TensorFlow",
        "PostgreSQL",
        "Databricks",
      ],
    },
    {
      title: "Sports Betting Platform",
      company: "Gaming Startup",
      industry: "Gaming",
      icon: "🎰",
      projectType: "Platform Development",
      duration: "12 months",
      team: "7 developers",
      challenge:
        "Entering competitive sports betting market requiring real-time odds, high concurrency during events, and strict gaming compliance.",
      solution:
        "Built scalable betting platform with real-time odds engine, implemented responsible gaming features, and achieved multi-state licensing.",
      results: [
        { metric: "500K+", description: "Active users" },
        { metric: "1M+", description: "Bets per day" },
        { metric: "12", description: "States licensed" },
        { metric: "$30M", description: "First-year GGR" },
      ],
      technologies: [
        "Node.js",
        "Angular",
        "Redis",
        "Kafka",
        "PostgreSQL",
        "AWS",
        "Terraform",
      ],
    },
    {
      title: "Agricultural IoT Platform",
      company: "AgTech Startup",
      industry: "Agriculture",
      icon: "🌾",
      projectType: "IoT Platform",
      duration: "10 months",
      team: "5 developers",
      challenge:
        "Farmers lacked data-driven insights, water waste in irrigation, and crop yield predictions were unreliable.",
      solution:
        "Deployed soil sensors and weather stations, built AI crop management platform, and implemented precision irrigation system.",
      results: [
        { metric: "30%", description: "Water savings" },
        { metric: "25%", description: "Yield increase" },
        { metric: "10K+", description: "Acres monitored" },
        { metric: "$5M", description: "Farmer savings" },
      ],
      technologies: [
        "Python",
        "Angular",
        "AWS IoT",
        "TensorFlow",
        "PostgreSQL",
        "Grafana",
        "LoRaWAN",
      ],
    },
    {
      title: "Airline Operations System",
      company: "Regional Airline",
      industry: "Aviation",
      icon: "✈️",
      projectType: "Operations Platform",
      duration: "14 months",
      team: "8 developers",
      challenge:
        "Manual crew scheduling, flight disruption management causing delays, and no integrated view of operations.",
      solution:
        "Built integrated operations control center with AI crew optimization, real-time disruption management, and predictive maintenance.",
      results: [
        { metric: "35%", description: "Fewer delays" },
        { metric: "$8M", description: "Annual savings" },
        { metric: "15%", description: "Better fuel efficiency" },
        { metric: "98%", description: "On-time performance" },
      ],
      technologies: [
        ".NET Core",
        "Angular",
        "Azure",
        "ML.NET",
        "SQL Server",
        "SignalR",
        "Power BI",
      ],
    },
    {
      title: "Subscription Box Platform",
      company: "D2C E-commerce Brand",
      industry: "E-Commerce",
      icon: "📦",
      projectType: "E-Commerce Platform",
      duration: "7 months",
      team: "4 developers",
      challenge:
        "High customer acquisition costs, poor retention rates, and fulfillment errors causing customer complaints.",
      solution:
        "Built personalized subscription platform with AI product recommendations, automated fulfillment integration, and customer engagement tools.",
      results: [
        { metric: "45%", description: "Better retention" },
        { metric: "30%", description: "Higher AOV" },
        { metric: "200K", description: "Subscribers" },
        { metric: "99.5%", description: "Fulfillment accuracy" },
      ],
      technologies: [
        "Angular",
        "Node.js",
        "MongoDB",
        "Stripe",
        "ShipStation",
        "Klaviyo",
        "AWS",
      ],
    },
    {
      title: "Construction Project Management",
      company: "General Contractor",
      industry: "Construction",
      icon: "🏗️",
      projectType: "Project Management",
      duration: "11 months",
      team: "6 developers",
      challenge:
        "Projects consistently over budget, poor subcontractor coordination, and no real-time visibility into project status.",
      solution:
        "Built construction management platform with BIM integration, automated progress tracking using drone imagery, and predictive cost management.",
      results: [
        { metric: "20%", description: "Under budget" },
        { metric: "30%", description: "Faster completion" },
        { metric: "$50M+", description: "Projects managed" },
        { metric: "Zero", description: "Safety incidents" },
      ],
      technologies: [
        "Angular",
        ".NET Core",
        "Azure",
        "Autodesk APIs",
        "Computer Vision",
        "PostgreSQL",
        "Power BI",
      ],
    },
    {
      title: "Nonprofit Donor Management",
      company: "National Charity Organization",
      industry: "Nonprofit",
      icon: "❤️",
      projectType: "CRM Platform",
      duration: "8 months",
      team: "4 developers",
      challenge:
        "Disconnected donor data, ineffective fundraising campaigns, and high administrative overhead limiting program spending.",
      solution:
        "Built unified donor platform with AI-powered giving predictions, automated campaign management, and integrated volunteer coordination.",
      results: [
        { metric: "50%", description: "More donations" },
        { metric: "35%", description: "Lower admin costs" },
        { metric: "2M+", description: "Donors managed" },
        { metric: "85%", description: "Donor retention" },
      ],
      technologies: [
        "Angular",
        "Node.js",
        "Salesforce NPSP",
        "AWS",
        "Stripe",
        "Mailchimp",
        "PostgreSQL",
      ],
    },
    {
      title: "Gym & Fitness Platform",
      company: "Fitness Franchise",
      industry: "Fitness",
      icon: "💪",
      projectType: "Member Platform",
      duration: "9 months",
      team: "5 developers",
      challenge:
        "Member engagement dropping, no virtual class offerings, and each franchise location operating on different systems.",
      solution:
        "Built unified fitness platform with on-demand classes, wearable integration, and franchise-wide member management.",
      results: [
        { metric: "60%", description: "Member engagement up" },
        { metric: "300+", description: "Locations unified" },
        { metric: "40%", description: "Revenue increase" },
        { metric: "4.8/5", description: "App store rating" },
      ],
      technologies: [
        "Angular",
        "Node.js",
        "AWS",
        "React Native",
        "Stripe",
        "MongoDB",
        "Wearable SDKs",
      ],
    },
    {
      title: "Hotel Revenue Management",
      company: "Boutique Hotel Chain",
      industry: "Hospitality",
      icon: "🏨",
      projectType: "Revenue Optimization",
      duration: "10 months",
      team: "5 developers",
      challenge:
        "Static pricing losing revenue, no competitive rate intelligence, and poor demand forecasting leading to empty rooms.",
      solution:
        "Built dynamic pricing engine with ML demand forecasting, competitor rate monitoring, and automated channel management.",
      results: [
        { metric: "25%", description: "RevPAR increase" },
        { metric: "15%", description: "Higher occupancy" },
        { metric: "$3M", description: "Additional revenue" },
        { metric: "Real-time", description: "Rate optimization" },
      ],
      technologies: [
        "Python",
        "Angular",
        ".NET Core",
        "Azure ML",
        "PostgreSQL",
        "Redis",
        "OTA APIs",
      ],
    },
    {
      title: "Media Streaming Platform",
      company: "Sports Media Company",
      industry: "Media",
      icon: "📺",
      projectType: "Streaming Platform",
      duration: "14 months",
      team: "9 developers",
      challenge:
        "Needed to launch direct-to-consumer streaming service to compete with major platforms while maintaining broadcast quality.",
      solution:
        "Built scalable OTT platform with adaptive bitrate streaming, personalized content recommendations, and multi-device support.",
      results: [
        { metric: "2M+", description: "Subscribers" },
        { metric: "99.9%", description: "Stream uptime" },
        { metric: "4K HDR", description: "Quality delivered" },
        { metric: "$50M", description: "Annual revenue" },
      ],
      technologies: [
        "Angular",
        "Node.js",
        "AWS MediaServices",
        "CDN",
        "MongoDB",
        "Redis",
        "Roku/Apple TV SDKs",
      ],
    },
    {
      title: "Warehouse Automation System",
      company: "3PL Provider",
      industry: "Logistics",
      icon: "📦",
      projectType: "Automation",
      duration: "16 months",
      team: "8 developers",
      challenge:
        "Manual picking processes causing errors, slow order fulfillment, and difficulty scaling during peak seasons.",
      solution:
        "Implemented automated picking with robotics, built WMS with real-time inventory, and deployed predictive demand planning.",
      results: [
        { metric: "300%", description: "Throughput increase" },
        { metric: "99.9%", description: "Picking accuracy" },
        { metric: "50%", description: "Labor cost reduction" },
        { metric: "Same-day", description: "Shipping capability" },
      ],
      technologies: [
        "Python",
        "Angular",
        ".NET Core",
        "ROS",
        "AWS",
        "PostgreSQL",
        "Computer Vision",
      ],
    },
    {
      title: "Veterinary Practice Management",
      company: "Vet Clinic Chain",
      industry: "Veterinary",
      icon: "🐾",
      projectType: "Practice Management",
      duration: "8 months",
      team: "4 developers",
      challenge:
        "Paper-based records, double-booked appointments, and no integrated pharmacy or lab management.",
      solution:
        "Built cloud-based practice management with electronic records, online booking, integrated pharmacy, and client communication portal.",
      results: [
        { metric: "40%", description: "More appointments" },
        { metric: "Zero", description: "Double bookings" },
        { metric: "35%", description: "Revenue increase" },
        { metric: "4.9/5", description: "Client satisfaction" },
      ],
      technologies: [
        "Angular",
        "Node.js",
        "MongoDB",
        "AWS",
        "Twilio",
        "Stripe",
        "Lab integrations",
      ],
    },
    {
      title: "Electric Vehicle Charging Network",
      company: "EV Infrastructure Company",
      industry: "Energy",
      icon: "🔌",
      projectType: "IoT Platform",
      duration: "12 months",
      team: "7 developers",
      challenge:
        "Managing 5,000+ charging stations, real-time availability updates needed, and complex billing for different rate structures.",
      solution:
        "Built charging network platform with real-time station monitoring, mobile app for drivers, and flexible billing engine.",
      results: [
        { metric: "5K+", description: "Stations managed" },
        { metric: "99.5%", description: "Station uptime" },
        { metric: "1M+", description: "Charging sessions/month" },
        { metric: "Real-time", description: "Availability updates" },
      ],
      technologies: [
        "Angular",
        "Node.js",
        "OCPP",
        "AWS IoT",
        "PostgreSQL",
        "Redis",
        "React Native",
      ],
    },
    {
      title: "Fashion E-commerce Personalization",
      company: "Online Fashion Retailer",
      industry: "Retail",
      icon: "👗",
      projectType: "AI Personalization",
      duration: "9 months",
      team: "5 developers",
      challenge:
        "Low conversion rates, high return rates due to sizing issues, and generic product recommendations.",
      solution:
        "Implemented AI-powered virtual try-on, size recommendation engine, and personalized product discovery using computer vision.",
      results: [
        { metric: "45%", description: "Conversion increase" },
        { metric: "35%", description: "Fewer returns" },
        { metric: "60%", description: "Higher engagement" },
        { metric: "$15M", description: "Additional revenue" },
      ],
      technologies: [
        "Python",
        "Angular",
        "TensorFlow",
        "AWS",
        "Computer Vision",
        "PostgreSQL",
        "Redis",
      ],
    },
    {
      title: "Museum Digital Experience",
      company: "National Museum",
      industry: "Arts & Culture",
      icon: "🏛️",
      projectType: "Digital Experience",
      duration: "10 months",
      team: "5 developers",
      challenge:
        "Declining visitor engagement, no digital presence for collections, and missed revenue opportunities from virtual visitors.",
      solution:
        "Built immersive digital platform with virtual tours, AR exhibit enhancement, online ticketing, and educational content portal.",
      results: [
        { metric: "500K+", description: "Virtual visitors" },
        { metric: "45%", description: "More engagement" },
        { metric: "$2M", description: "Digital revenue" },
        { metric: "Global", description: "Audience reach" },
      ],
      technologies: [
        "Angular",
        "Three.js",
        "AR.js",
        "Node.js",
        "AWS",
        "MongoDB",
        "Stripe",
      ],
    },
    {
      title: "Insurance Underwriting AI",
      company: "Commercial Insurance Provider",
      industry: "Insurance",
      icon: "📊",
      projectType: "AI Platform",
      duration: "14 months",
      team: "8 developers",
      challenge:
        "Manual underwriting taking weeks, inconsistent risk assessment, and losing deals to faster competitors.",
      solution:
        "Built AI-powered underwriting platform with automated risk scoring, document analysis, and instant quote generation.",
      results: [
        { metric: "Minutes", description: "vs weeks for quotes" },
        { metric: "30%", description: "Better loss ratios" },
        { metric: "3x", description: "Quote volume" },
        { metric: "$20M", description: "New premium" },
      ],
      technologies: [
        ".NET Core",
        "Angular",
        "Azure ML",
        "Cosmos DB",
        "Azure Cognitive Services",
        "Power BI",
      ],
    },
    {
      title: "Concert Ticketing Platform",
      company: "Live Events Company",
      industry: "Entertainment",
      icon: "🎵",
      projectType: "E-Commerce",
      duration: "8 months",
      team: "6 developers",
      challenge:
        "Bot scalping causing customer frustration, payment failures during high-demand sales, and no secondary market control.",
      solution:
        "Built anti-bot ticketing platform with queue management, blockchain-verified tickets, and controlled resale marketplace.",
      results: [
        { metric: "95%", description: "Bot prevention" },
        { metric: "Zero", description: "Payment failures" },
        { metric: "5M+", description: "Tickets sold" },
        { metric: "50%", description: "Scalping reduction" },
      ],
      technologies: [
        "Angular",
        "Node.js",
        "AWS",
        "Redis",
        "PostgreSQL",
        "Blockchain",
        "Stripe",
      ],
    },
    {
      title: "Clinical Laboratory System",
      company: "Diagnostic Lab Network",
      industry: "Healthcare",
      icon: "🔬",
      projectType: "LIS/LIMS",
      duration: "15 months",
      team: "8 developers",
      challenge:
        "Paper-based workflows, manual result entry causing errors, and slow turnaround times affecting patient care.",
      solution:
        "Built modern LIS with automated instrument integration, real-time result delivery, and patient portal access.",
      results: [
        { metric: "70%", description: "Faster turnaround" },
        { metric: "99.9%", description: "Result accuracy" },
        { metric: "10M+", description: "Tests/year processed" },
        { metric: "Zero", description: "Critical result delays" },
      ],
      technologies: [
        ".NET Core",
        "Angular",
        "HL7",
        "SQL Server",
        "Azure",
        "ASTM",
        "Power BI",
      ],
    },
    {
      title: "Renewable Energy Trading",
      company: "Clean Energy Developer",
      industry: "Energy",
      icon: "🌱",
      projectType: "Trading Platform",
      duration: "11 months",
      team: "6 developers",
      challenge:
        "Complex REC trading requirements, manual tracking of renewable credits, and regulatory reporting burden.",
      solution:
        "Built renewable energy certificate trading platform with automated tracking, market integration, and compliance reporting.",
      results: [
        { metric: "$100M+", description: "Credits traded" },
        { metric: "100%", description: "Compliance rate" },
        { metric: "80%", description: "Less admin time" },
        { metric: "Real-time", description: "Market access" },
      ],
      technologies: [
        "Angular",
        ".NET Core",
        "Azure",
        "PostgreSQL",
        "Blockchain",
        "Power BI",
        "RESTful APIs",
      ],
    },
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.animateOnScroll();
    }
  }

  animateOnScroll() {
    // Hero animations
    gsap.from(".hero-content > *", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Case studies
    gsap.utils.toArray<HTMLElement>(".case-study").forEach((study, index) => {
      gsap.from(study, {
        scrollTrigger: {
          trigger: study,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
      });
    });

    // Stats cards
    gsap.utils.toArray<HTMLElement>(".stat-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.6,
        delay: index * 0.1,
      });
    });

    // Industry cards
    gsap.utils.toArray<HTMLElement>(".industry-card").forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        },
        opacity: 0,
        y: 30,
        duration: 0.5,
        delay: index * 0.08,
      });
    });

    // Testimonial
    gsap.from(".testimonial-card", {
      scrollTrigger: {
        trigger: ".testimonial-section",
        start: "top 80%",
        once: true,
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
    });

    // CTA
    gsap.from(".cta-card", {
      scrollTrigger: {
        trigger: ".cta-section",
        start: "top 80%",
        once: true,
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
    });
  }

  loadMoreCaseStudies() {
    this.showAllCaseStudies = true;
    // Refresh ScrollTrigger after showing more case studies
    if (this.isBrowser) {
      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 100);
    }
  }
}
