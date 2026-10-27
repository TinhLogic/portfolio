/**
 * Portfolio Data - Professional Portfolio Data Store
 * Clean data without emoji pollution; tabular numeric data for precision.
 * Encapsulated in IIFE to prevent global identifier collisions.
 */

(function (global) {
  const performanceStats = [
    { value: "8+", label: "Năm kinh nghiệm" },
    { value: "40M+", label: "Truy vấn API/ngày" },
    { value: "<15ms", label: "P99 Độ trễ phản hồi" },
    { value: "99.99%", label: "Độ sẵn sàng hệ thống" }
  ];

  const coreTechnologies = [
    { name: ".NET 8", detail: "C# 12" },
    { name: "TypeScript", detail: "ESNext" },
    { name: "PostgreSQL", detail: "Distributed" },
    { name: "Redis", detail: "In-Memory" },
    { name: "ClickHouse", detail: "Columnar" },
    { name: "Docker", detail: "K8s" },
    { name: "WAI-ARIA", detail: "WCAG AA" }
  ];

  const profileData = {
    name: "Duy Tinh",
    headline: "Nguyễn Duy Tính",
    title: "Senior Full-Stack & Systems Engineer",
    tagline: "Architecting high-throughput distributed systems & accessible web experiences.",
    status: "Available for high-impact engineering roles & consultations",
    location: "Ho Chi Minh City, Vietnam (UTC+7)",
    email: "contact@duytinh.dev",
    zalo: "0901234567",
    zaloLink: "https://zalo.me/0901234567",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    bio: "Kỹ sư phần mềm cao cấp chuyên sâu về backend hiệu năng cao, zero-allocation C#/.NET 8, hệ thống xử lý hàng chục triệu requests/ngày và giao diện web hiện đại tuân thủ nghiêm ngặt chuẩn trợ năng WAI-ARIA WCAG 2.1 AA.",
    heroLead: "Kỹ sư phần mềm cao cấp chuyên sâu về backend hiệu năng cao, zero-allocation C#/.NET 8, hệ thống xử lý hàng chục triệu requests/ngày và giao diện web hiện đại tuân thủ nghiêm ngặt chuẩn trợ năng WAI-ARIA WCAG 2.1 AA.",
    stats: performanceStats
  };

  const categories = [
    { id: "all", label: "Tất cả dự án" },
    { id: "systems", label: "Hệ thống phân tán" },
    { id: "web", label: "Ứng dụng Web" },
    { id: "tools", label: "Công cụ lập trình" },
    { id: "ai", label: "AI & Dữ liệu" }
  ];

  const projectsData = [
    {
      id: "hyper-cache-engine",
      title: "ApexKV: Distributed In-Memory Cache",
      category: "systems",
      badge: "Production",
      badgeType: "production",
      shortDescription: "Ultra-low latency distributed in-memory cache engine with Raft consensus and zero-allocation socket pipeline.",
      fullDescription: "A distributed key-value storage engine built for microsecond response times. ApexKV employs Raft consensus for state replication, zero-copy buffer pooling, and memory-mapped append-only logs for persistent crash recovery.",
      architecture: "Engineered in C# 12 / .NET 8 using System.IO.Pipelines, Memory<byte>, and custom lock-free ring buffers. Implements custom binary wire protocol achieving 450,000 requests/second per node.",
      metrics: [
        { label: "Throughput", value: "450k req/s" },
        { label: "P99 Latency", value: "0.85ms" },
        { label: "Memory Efficiency", value: "94.2%" }
      ],
      techStack: [".NET 8", "C#", "System.IO.Pipelines", "Raft Consensus", "Docker", "Prometheus"],
      githubUrl: "https://github.com",
      liveUrl: "https://apexkv.internal.dev"
    },
    {
      id: "cloud-telemetry-dashboard",
      title: "Vigil: Observability & APM Platform",
      category: "web",
      badge: "Production",
      badgeType: "production",
      shortDescription: "Enterprise observability dashboard processing OpenTelemetry traces, distributed spans, and real-time alerts.",
      fullDescription: "Full-scale application performance monitoring UI with real-time streaming charts, flame graphs for tracing, and accessible incident triage workflows with keyboard-first navigation.",
      architecture: "Frontend built with TypeScript, modular Web Components, and virtualized canvas graphs. Backed by ClickHouse for columnar log analytics and WebSockets for sub-100ms log streaming.",
      metrics: [
        { label: "Event Ingestion", value: "1.2B/day" },
        { label: "Query Speed", value: "<120ms" },
        { label: "Lighthouse A11y", value: "100/100" }
      ],
      techStack: ["TypeScript", "ClickHouse", "WebSockets", "WAI-ARIA", "Tailwind CSS"],
      githubUrl: "https://github.com",
      liveUrl: "https://vigil-apm.demo.dev"
    },
    {
      id: "rfc-problem-details-sdk",
      title: "ProblemDetails.NET: RFC 9457 Library",
      category: "tools",
      badge: "Open Source",
      badgeType: "open-source",
      shortDescription: "Standardized RFC 9457 HTTP API error handling middleware with zero allocation and automatic schema generation.",
      fullDescription: "Open-source developer library enforcing RFC 9457 Problem Details across microservices with compile-time source generators, localized client messaging, and correlation ID tracing.",
      architecture: "Utilizes .NET Roslyn Source Generators to emit zero-reflection serializers, reducing error serialization overhead to 0 bytes GC heap allocation.",
      metrics: [
        { label: "GC Allocation", value: "0 B" },
        { label: "NuGet Downloads", value: "85k+" },
        { label: "Test Coverage", value: "99.4%" }
      ],
      techStack: [".NET", "C#", "Roslyn Generators", "RFC 9457", "xUnit", "BenchmarkDotNet"],
      githubUrl: "https://github.com",
      liveUrl: "https://nuget.org"
    },
    {
      id: "edge-inference-gateway",
      title: "Synapse: Edge AI Routing Gateway",
      category: "ai",
      badge: "Production",
      badgeType: "production",
      shortDescription: "Intelligent reverse proxy routing prompt requests between OpenAI, Anthropic, and local self-hosted vLLM instances.",
      fullDescription: "High-concurrency LLM gateway providing semantic caching, automatic fallback failovers, budget rate limiting, and token streaming normalization.",
      architecture: "Built on Go and Envoy Proxy with Redis semantic vector cache (embeddings cosine similarity). Reduces LLM recurring API bills by 38% through prompt deduplication.",
      metrics: [
        { label: "Cost Reduction", value: "38.5%" },
        { label: "Cache Hit Rate", value: "24.1%" },
        { label: "Routing Overhead", value: "<4ms" }
      ],
      techStack: ["Go", "Envoy", "Redis", "Vector Embeddings", "vLLM", "OpenAI API"],
      githubUrl: "https://github.com",
      liveUrl: "https://synapse-gateway.dev"
    },
    {
      id: "financial-settlement-engine",
      title: "LedgerStream: Double-Entry Core Banking",
      category: "systems",
      badge: "Production",
      badgeType: "production",
      shortDescription: "Idempotent double-entry accounting ledger engine with cryptographically verifiable audit trails.",
      fullDescription: "High-throughput financial ledger processing multi-currency transfers, automated reconciliation, and strict ACID guarantees across PostgreSQL partition shards.",
      architecture: "Event-sourced transactional model using Kafka event log with optimistic concurrency control and idempotency key locks preventing duplicate debit transactions.",
      metrics: [
        { label: "Processed Volume", value: "$180M+" },
        { label: "Discrepancy Rate", value: "0.000%" },
        { label: "Shard Scale", value: "16 Nodes" }
      ],
      techStack: ["PostgreSQL", "Kafka", ".NET 8", "Redis Distributed Locks", "Docker"],
      githubUrl: "https://github.com",
      liveUrl: "https://ledgerstream.internal.dev"
    },
    {
      id: "accessible-design-system",
      title: "Geist-A11y: Headless Component Suite",
      category: "tools",
      badge: "Open Source",
      badgeType: "open-source",
      shortDescription: "Accessible, keyboard-navigable headless UI components implementing WAI-ARIA authoring practices.",
      fullDescription: "Complete suite of accessible UI primitives including virtualized comboboxes, slide-over sheets, and data tables with screen reader announcements.",
      architecture: "Framework-agnostic TypeScript primitives with automated axe-core accessibility unit tests and WCAG 2.1 AA compliance certification.",
      metrics: [
        { label: "Bundle Size", value: "4.8 KB" },
        { label: "WCAG Level", value: "2.1 AA" },
        { label: "GitHub Stars", value: "1.4k" }
      ],
      techStack: ["TypeScript", "WAI-ARIA", "Vite", "axe-core", "CSS Custom Properties"],
      githubUrl: "https://github.com",
      liveUrl: "https://geist-a11y.dev"
    }
  ];

  const experienceData = [
    {
      period: "2023 — Hiện tại",
      role: "Lead Systems & Cloud Architect",
      company: "FinTech Infrastructure Corp",
      description: "Chủ trì hiện đại hóa hạ tầng giao dịch thanh toán lõi, chuyển đổi hệ thống monolithic sang microservices hiệu năng cao trên .NET 8. Giảm 68% độ trễ xử lý giao dịch, vận hành an toàn với sản lượng hơn $180M/tháng và độ sẵn sàng 99.995%."
    },
    {
      period: "2021 — 2023",
      role: "Senior Full-Stack Software Engineer",
      company: "Enterprise Cloud Platforms",
      description: "Kiến trúc nền tảng phát triển nội bộ và hệ thống giám sát phân tán (Observability). Xây dựng telemetry dashboard xử lý hàng tỷ metrics/ngày trên cụm ClickHouse với thời gian phản hồi dưới 1 giây. Thực thi tiêu chuẩn trợ năng WAI-ARIA WCAG 2.1 AA trên toàn bộ design system doanh nghiệp."
    },
    {
      period: "2019 — 2021",
      role: "Backend Software Engineer",
      company: "Distributed Systems Lab",
      description: "Thiết kế các thuật toán đồng thuận phân tán, giao thức RPC tùy chỉnh và bộ nhớ đệm phân tán bằng C# và Go. Tối ưu hóa bộ nhớ RAM với kỹ thuật zero-allocation buffer pooling và kiểm thử hiệu năng khắt khe bằng BenchmarkDotNet."
    },
    {
      period: "2017 — 2019",
      role: "Software Developer",
      company: "Digital Solutions Studio",
      description: "Phát triển các ứng dụng web phục vụ khách hàng doanh nghiệp, thiết kế RESTful APIs chuẩn mực và kiến trúc cơ sở dữ liệu quan hệ PostgreSQL với ASP.NET Core. Tự động hóa quy trình CI/CD qua Docker và GitHub Actions."
    }
  ];

  const technicalSkills = [
    {
      category: "Ngôn ngữ & Nền tảng",
      skills: ["C# / .NET 8+", "TypeScript", "JavaScript (ESNext)", "Go", "SQL", "HTML5 & CSS3"]
    },
    {
      category: "Kiến trúc & Chuẩn mực",
      skills: ["Domain-Driven Design (DDD)", "Event-Driven Architecture", "CQRS & Event Sourcing", "Zero-Allocation Design", "RFC 9457 Problem Details", "WAI-ARIA WCAG 2.1 AA"]
    },
    {
      category: "Cơ sở dữ liệu & Streaming",
      skills: ["PostgreSQL", "Redis & Dragonfly", "ClickHouse", "Apache Kafka", "RabbitMQ", "SQLite"]
    },
    {
      category: "DevOps & Hạ tầng",
      skills: ["Docker", "Kubernetes", "Linux / Bash", "Terraform", "GitHub Actions", "Prometheus & Grafana"]
    }
  ];

  const portfolioData = {
    profileData,
    performanceStats,
    coreTechnologies,
    categories,
    projectsData,
    experienceData,
    technicalSkills
  };

  // Expose to global scope (window or globalThis)
  global.portfolioData = portfolioData;

  // CommonJS support for Node.js
  if (typeof module !== "undefined" && module.exports) {
    module.exports = portfolioData;
  }
})(typeof window !== "undefined" ? window : globalThis);
