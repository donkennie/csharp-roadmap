import React, { useState, useEffect, useMemo } from "react";
import {
  GitBranch,
  Hammer,
  Rocket,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Check,
  ArrowRight,
  Code2,
  BookOpen,
  Youtube,
  PenLine,
  Github,
  FlaskConical,
  Layers,
  Sparkles,
  CircleDot,
  ExternalLink,
  Clock,
  Flag,
  Compass,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DESIGN TOKENS                                                      */
/* ------------------------------------------------------------------ */

const ACCENT = {
  beginner: "#06b6d4", // cyan
  midlevel: "#7c3aed", // purple
  senior: "#10b981", // emerald
};

const RES_META = {
  video: { icon: "🎥", label: "Video" },
  doc: { icon: "📖", label: "Docs" },
  article: { icon: "📝", label: "Article" },
  book: { icon: "📚", label: "Book" },
  repo: { icon: "💾", label: "Repo" },
  lab: { icon: "🧪", label: "Lab" },
};

const yt = (q) =>
  `https://www.youtube.com/results?search_query=${q.replace(/\s+/g, "+")}`;

/* ------------------------------------------------------------------ */
/*  ROADMAP DATA  (every resource has a real, clickable URL)          */
/* ------------------------------------------------------------------ */

const TRACKS = [
  {
    id: "beginner",
    name: "Beginner Track",
    tagline: "C# Fundamentals → OOP → Web APIs",
    tag: "3 Months",
    accent: ACCENT.beginner,
    capstone: {
      name: "BookVault — Personal Library API",
      blurb:
        "Ship a complete, secured, documented REST API that proves your fundamentals.",
    },
    modules: [
      {
        title: "C# Basics",
        summary: "The C# language and .NET ecosystem from the ground up.",
        time: "~2 weeks",
        theory: [
          "Introduction to C# and the .NET ecosystem",
          "Basic syntax and structure",
          "Variables, data types, and operators",
          "Control structures (if, loops, switch)",
        ],
        resources: [
          { t: "video", title: "C# Tutorial for Beginners", by: "Tim Corey · YouTube (free full course)", url: yt("Tim Corey C# Tutorial for Beginners") },
          { t: "video", title: "C# Fundamentals for Absolute Beginners", by: "Microsoft Learn Shows", url: "https://learn.microsoft.com/shows/csharp-fundamentals-for-absolute-beginners/" },
          { t: "doc", title: "Tour of C#", by: "learn.microsoft.com", url: "https://learn.microsoft.com/dotnet/csharp/tour-of-csharp/" },
          { t: "doc", title: "C# Language Reference", by: "learn.microsoft.com", url: "https://learn.microsoft.com/dotnet/csharp/language-reference/" },
          { t: "article", title: "Learn C# — interactive tutorials", by: "learn.microsoft.com", url: "https://learn.microsoft.com/dotnet/csharp/tour-of-csharp/tutorials/" },
          { t: "book", title: "C# 12 in a Nutshell — Ch. 1–5", by: "Joseph Albahari", url: "https://www.albahari.com/nutshell/" },
          { t: "repo", title: "dotnet/docs", by: "Official .NET docs & samples", url: "https://github.com/dotnet/docs" },
          { t: "lab", title: "C# first steps", by: "Microsoft Learn path", url: "https://learn.microsoft.com/training/paths/csharp-first-steps/" },
        ],
        tasks: [
          "Create a console calculator",
          "Build a number-guessing game",
          "Implement a simple banking system (deposit/withdraw)",
        ],
        outcomes:
          "Can write basic C# programs, understand data types, control flow, and basic I/O.",
      },
      {
        title: "Object-Oriented Programming",
        summary: "Model the real world with classes, inheritance, and interfaces.",
        time: "~2 weeks",
        theory: [
          "Classes and objects",
          "Inheritance and polymorphism",
          "Interfaces and abstract classes",
          "Access modifiers",
        ],
        resources: [
          { t: "video", title: "OOP in C# — Full Course", by: "Tim Corey · YouTube", url: yt("Tim Corey OOP in C# Full Course") },
          { t: "video", title: "Object Oriented Programming with C#", by: "Nick Chapsas · YouTube", url: yt("Nick Chapsas Object Oriented Programming C#") },
          { t: "doc", title: "Object-oriented programming in C#", by: "learn.microsoft.com", url: "https://learn.microsoft.com/dotnet/csharp/fundamentals/object-oriented/" },
          { t: "article", title: "The SOLID Principles of OOP in Plain English", by: "freeCodeCamp", url: "https://www.freecodecamp.org/news/solid-principles-explained-in-plain-english/" },
          { t: "book", title: "C# 12 in a Nutshell — Ch. 6–10", by: "Joseph Albahari", url: "https://www.albahari.com/nutshell/" },
          { t: "repo", title: "dotnet/samples", by: "Official .NET code samples", url: "https://github.com/dotnet/samples" },
          { t: "lab", title: "Take your first steps with C#", by: "Microsoft Learn path", url: "https://learn.microsoft.com/training/paths/get-started-c-sharp-part-1/" },
        ],
        tasks: [
          "Design a shape hierarchy (Circle, Rectangle, Triangle)",
          "Create a simple library management system",
          "Implement a basic employee management system",
        ],
        outcomes:
          "Can design class hierarchies, use interfaces, understand polymorphism, and apply SOLID principles.",
      },
      {
        title: "Advanced C# Features",
        summary: "Delegates, events, generics, and LINQ fluency.",
        time: "~2 weeks",
        theory: [
          "Delegates and events",
          "Exception handling",
          "Generics",
          "LINQ basics",
        ],
        resources: [
          { t: "video", title: "Delegates and Events in C#", by: "Nick Chapsas · YouTube", url: yt("Nick Chapsas Delegates and Events in C#") },
          { t: "video", title: "LINQ Tutorial for Beginners", by: "Tim Corey · YouTube", url: yt("Tim Corey LINQ Tutorial for Beginners") },
          { t: "doc", title: "Delegates", by: "learn.microsoft.com", url: "https://learn.microsoft.com/dotnet/csharp/programming-guide/delegates/" },
          { t: "doc", title: "LINQ Overview", by: "learn.microsoft.com", url: "https://learn.microsoft.com/dotnet/csharp/linq/" },
          { t: "article", title: "Edulinq — rebuilding LINQ from scratch", by: "Jon Skeet", url: "https://codeblog.jonskeet.uk/category/edulinq/" },
          { t: "book", title: "C# 12 in a Nutshell — Ch. 11–15", by: "Joseph Albahari", url: "https://www.albahari.com/nutshell/" },
          { t: "repo", title: "dotnet/try-samples", by: "Interactive LINQ samples", url: "https://github.com/dotnet/try-samples" },
          { t: "lab", title: "Write LINQ queries in C#", by: "Microsoft Learn module", url: "https://learn.microsoft.com/training/modules/csharp-linq/" },
        ],
        tasks: [
          "Build an event-driven notification system",
          "Create a generic repository pattern",
          "Implement LINQ queries for data manipulation",
        ],
        outcomes:
          "Can use delegates, events, generics, and LINQ fluently. Understands deferred execution.",
      },
      {
        title: "Collections and File Operations",
        summary:
          "Pick the right data structure and write async code that doesn't deadlock.",
        time: "~2 weeks",
        theory: [
          "Lists, Arrays, Dictionaries",
          "File I/O operations",
          "Async/await patterns",
          "Stream handling",
        ],
        resources: [
          { t: "video", title: "Async/Await in C# — A Deep Dive", by: "Nick Chapsas · YouTube", url: yt("Nick Chapsas Async Await in C# deep dive") },
          { t: "video", title: "Collections in C#", by: "Tim Corey · YouTube", url: yt("Tim Corey Collections in C#") },
          { t: "doc", title: "Collections", by: "learn.microsoft.com", url: "https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/collections" },
          { t: "doc", title: "Asynchronous programming", by: "learn.microsoft.com", url: "https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/" },
          { t: "article", title: "Async and Await", by: "Stephen Cleary", url: "https://blog.stephencleary.com/2012/02/async-and-await.html" },
          { t: "book", title: "Concurrency in C# Cookbook", by: "Stephen Cleary", url: "https://www.oreilly.com/library/view/concurrency-in-c/9781492054498/" },
          { t: "repo", title: "AspNetCoreDiagnosticScenarios", by: "David Fowler · async anti-patterns", url: "https://github.com/davidfowl/AspNetCoreDiagnosticScenarios" },
          { t: "lab", title: "Work with files and directories", by: "Microsoft Learn", url: "https://learn.microsoft.com/training/browse/?terms=files%20C%23" },
        ],
        tasks: [
          "Create a file-based todo list manager",
          "Build a concurrent dictionary-based cache",
          "Implement async file processing system",
        ],
        outcomes:
          "Can choose the right collection type, handle files, and write async code that doesn't deadlock.",
      },
      {
        title: "ASP.NET Core Basics",
        summary: "Build your first production-style REST API.",
        time: "~2 weeks",
        theory: [
          "REST API fundamentals",
          "Controllers and routing",
          "Dependency injection",
          "Middleware concepts",
        ],
        resources: [
          { t: "video", title: "ASP.NET Core Web API Tutorial", by: "Nick Chapsas · YouTube", url: yt("Nick Chapsas ASP.NET Core Web API tutorial") },
          { t: "video", title: "REST API with .NET 8", by: "Tim Corey · YouTube", url: yt("Tim Corey REST API .NET 8") },
          { t: "doc", title: "ASP.NET Core fundamentals", by: "learn.microsoft.com", url: "https://learn.microsoft.com/aspnet/core/fundamentals/" },
          { t: "doc", title: "Tutorial: Create a web API", by: "learn.microsoft.com", url: "https://learn.microsoft.com/aspnet/core/tutorials/first-web-api" },
          { t: "article", title: "andrewlock.net", by: "Andrew Lock — top ASP.NET Core blog", url: "https://andrewlock.net/" },
          { t: "book", title: "ASP.NET Core in Action, 3rd ed.", by: "Andrew Lock (Manning)", url: "https://www.manning.com/books/asp-net-core-in-action-third-edition" },
          { t: "repo", title: "dotnet/AspNetCore.Docs.Samples", by: "Official ASP.NET Core samples", url: "https://github.com/dotnet/AspNetCore.Docs.Samples" },
          { t: "lab", title: "Build web APIs with ASP.NET Core", by: "Microsoft Learn path", url: "https://learn.microsoft.com/training/paths/create-web-api-aspnet-core/" },
        ],
        tasks: [
          "Create a basic CRUD API",
          "Implement custom middleware",
          "Build a REST API with proper HTTP methods",
        ],
        outcomes:
          "Can build and test a REST API from scratch with proper DI, routing, and middleware.",
      },
      {
        title: "Database and Security",
        summary: "Persist data with EF Core and lock it down with auth.",
        time: "~2 weeks",
        theory: [
          "Entity Framework Core basics",
          "Authentication and authorization",
          "API documentation",
          "Basic security practices",
        ],
        resources: [
          { t: "video", title: "Entity Framework Core Tutorial", by: "Tim Corey · YouTube", url: yt("Tim Corey Entity Framework Core tutorial") },
          { t: "video", title: "JWT Authentication in ASP.NET Core", by: "Nick Chapsas · YouTube", url: yt("Nick Chapsas JWT Authentication ASP.NET Core") },
          { t: "doc", title: "EF Core — Getting Started", by: "learn.microsoft.com", url: "https://learn.microsoft.com/ef/core/get-started/overview/first-app" },
          { t: "doc", title: "ASP.NET Core Security", by: "learn.microsoft.com", url: "https://learn.microsoft.com/aspnet/core/security/" },
          { t: "article", title: "thereformedprogrammer.net", by: "Jon P. Smith — advanced EF Core", url: "https://www.thereformedprogrammer.net/" },
          { t: "book", title: "Entity Framework Core in Action, 2nd ed.", by: "Jon P. Smith (Manning)", url: "https://www.manning.com/books/entity-framework-core-in-action-second-edition" },
          { t: "repo", title: "dotnet/eShop", by: "Microsoft's modern .NET reference app", url: "https://github.com/dotnet/eShop" },
          { t: "lab", title: "Persist and retrieve data with EF Core", by: "Microsoft Learn module", url: "https://learn.microsoft.com/training/modules/persist-data-ef-core/" },
        ],
        tasks: [
          "Build a complete Web API with database",
          "Implement JWT authentication",
          "Create Swagger documentation",
        ],
        outcomes:
          "Can connect an API to a database, implement auth, and document APIs. Ready for the mid-level track.",
      },
    ],
  },

  {
    id: "midlevel",
    name: "Mid-Level Track",
    tagline: "Deep C# → Architecture → Testing → CI/CD",
    tag: "6 Modules",
    accent: ACCENT.midlevel,
    capstone: {
      name: "TaskForge — Multi-Tenant Task Management API",
      blurb:
        "A production-grade, observable, multi-tenant service shipped through CI.",
    },
    modules: [
      {
        title: "Deep C# & the CLR",
        summary:
          "What really happens beneath your code: memory, GC, and modern types.",
        time: "~2 weeks",
        theory: [
          "Value vs reference types, boxing, struct vs class, readonly struct, record vs record struct",
          "Memory: stack vs heap, GC generations, IDisposable, dispose pattern",
          "Span<T>, Memory<T>, ArrayPool<T>",
          "Pattern matching: switch expressions, property patterns, list patterns",
          "Nullable reference types",
        ],
        resources: [
          { t: "video", title: "C# Value Types vs Reference Types", by: "Nick Chapsas · YouTube", url: yt("Nick Chapsas value types vs reference types C#") },
          { t: "video", title: "Span<T> in C#", by: "Nick Chapsas · YouTube", url: yt("Nick Chapsas Span T C#") },
          { t: "doc", title: "C# Language Reference", by: "learn.microsoft.com", url: "https://learn.microsoft.com/dotnet/csharp/language-reference/" },
          { t: "doc", title: "Garbage Collection — Fundamentals", by: "learn.microsoft.com", url: "https://learn.microsoft.com/dotnet/standard/garbage-collection/fundamentals" },
          { t: "article", title: "All About Span", by: "Stephen Toub (MSDN Magazine)", url: "https://learn.microsoft.com/archive/msdn-magazine/2018/january/csharp-all-about-span-exploring-a-new-net-mainstay" },
          { t: "book", title: "C# in Depth, 4th ed.", by: "Jon Skeet", url: "https://csharpindepth.com/" },
          { t: "book", title: "Pro .NET Memory Management", by: "Konrad Kokosa", url: "https://prodotnetmemory.com/" },
          { t: "repo", title: "dotnet/runtime", by: "Read CoreLib source for List<T>, Span<T>", url: "https://github.com/dotnet/runtime" },
          { t: "lab", title: "Advanced C#", by: "Microsoft Learn", url: "https://learn.microsoft.com/training/browse/?terms=advanced%20C%23" },
        ],
        tasks: [
          "Allocation audit with BenchmarkDotNet",
          "Re-implement List<T> from scratch",
          "Nullable reference type clean-up on an existing project",
        ],
        outcomes:
          "Understands CLR internals, the memory model, and modern C# patterns. Can optimize allocations.",
      },
      {
        title: "Async, Concurrency & LINQ Mastery",
        summary: "State machines, channels, and concurrent code that scales.",
        time: "~2 weeks",
        theory: [
          "How async/await works (state machines, Task vs ValueTask)",
          "ConfigureAwait, deadlocks, SynchronizationContext",
          "CancellationToken, IAsyncEnumerable<T>, Channels, SemaphoreSlim",
          "LINQ deferred execution, IQueryable vs IEnumerable, expression trees",
        ],
        resources: [
          { t: "video", title: "The Async Await Episode", by: "Nick Chapsas · YouTube", url: yt("Nick Chapsas The Async Await Episode") },
          { t: "doc", title: "Asynchronous programming", by: "learn.microsoft.com", url: "https://learn.microsoft.com/dotnet/csharp/asynchronous-programming/" },
          { t: "doc", title: "System.Threading.Channels", by: "learn.microsoft.com", url: "https://learn.microsoft.com/dotnet/core/extensions/channels" },
          { t: "article", title: "Don't Block on Async Code", by: "Stephen Cleary — the async bible", url: "https://blog.stephencleary.com/2012/07/dont-block-on-async-code.html" },
          { t: "article", title: "How Async/Await Really Works in C#", by: "Stephen Toub (.NET Blog)", url: "https://devblogs.microsoft.com/dotnet/how-async-await-really-works/" },
          { t: "book", title: "Concurrency in C# Cookbook", by: "Stephen Cleary", url: "https://www.oreilly.com/library/view/concurrency-in-c/9781492054498/" },
          { t: "repo", title: "dotnet/reactive", by: "When LINQ-to-objects isn't enough", url: "https://github.com/dotnet/reactive" },
          { t: "lab", title: "C# async programming scenarios", by: "Killercoda", url: "https://killercoda.com/" },
        ],
        tasks: [
          "Parallel web scraper with SemaphoreSlim",
          "Producer/consumer pipeline with Channels",
          "LINQ rewrite challenge (10 foreach → LINQ and back)",
        ],
        outcomes:
          "Can explain async state machines. Writes concurrent code that doesn't deadlock.",
      },
      {
        title: "ASP.NET Core In Depth",
        summary: "The request pipeline, DI lifetimes, and configuration mastered.",
        time: "~2 weeks",
        theory: [
          "Request pipeline, middleware ordering, endpoint routing",
          "DI lifetimes and the captured-dependency trap",
          "IOptions<T>, IOptionsSnapshot<T>, IOptionsMonitor<T>",
          "Filters vs middleware, ProblemDetails (RFC 7807), Minimal APIs vs Controllers",
        ],
        resources: [
          { t: "video", title: "Minimal APIs in .NET", by: "Nick Chapsas · YouTube", url: yt("Nick Chapsas Minimal APIs .NET") },
          { t: "doc", title: "ASP.NET Core Fundamentals", by: "learn.microsoft.com", url: "https://learn.microsoft.com/aspnet/core/fundamentals/" },
          { t: "article", title: "ASP.NET Core in Action — blog series", by: "Andrew Lock", url: "https://andrewlock.net/" },
          { t: "article", title: "milanjovanovic.tech", by: "Milan Jovanović — modern patterns", url: "https://www.milanjovanovic.tech/" },
          { t: "book", title: "ASP.NET Core in Action, 3rd ed.", by: "Andrew Lock (Manning)", url: "https://www.manning.com/books/asp-net-core-in-action-third-edition" },
          { t: "repo", title: "dotnet/aspnetcore", by: "src/Middleware is a masterclass", url: "https://github.com/dotnet/aspnetcore" },
          { t: "lab", title: "Build web APIs with ASP.NET Core", by: "Microsoft Learn (advanced)", url: "https://learn.microsoft.com/training/paths/create-web-api-aspnet-core/" },
        ],
        tasks: [
          "Custom middleware stack (correlation IDs, logging, exception handling, rate limiting)",
          "Feature-flagged API with Microsoft.FeatureManagement",
          "Minimal API rewrite of a controller-based API",
        ],
        outcomes:
          "Understands the full request pipeline. Can design middleware and justify Minimal vs Controller APIs.",
      },
      {
        title: "EF Core & Data",
        summary: "Query performance, migrations, and knowing when to drop to Dapper.",
        time: "~2 weeks",
        theory: [
          "Change tracking, AsNoTracking, identity resolution",
          "Migrations: adding, reverting, seeding, production safety",
          "Query performance: Include, projection, N+1, compiled queries",
          "Transactions, concurrency tokens",
          "When not to use EF (Dapper, raw SQL)",
        ],
        resources: [
          { t: "video", title: "EF Core Mistakes to Avoid", by: "Nick Chapsas · YouTube series", url: yt("Nick Chapsas EF Core mistakes to avoid") },
          { t: "doc", title: "EF Core Performance", by: "learn.microsoft.com", url: "https://learn.microsoft.com/ef/core/performance/" },
          { t: "article", title: "thereformedprogrammer.net", by: "Jon P. Smith — advanced EF Core", url: "https://www.thereformedprogrammer.net/" },
          { t: "book", title: "Entity Framework Core in Action, 2nd ed.", by: "Jon P. Smith (Manning)", url: "https://www.manning.com/books/entity-framework-core-in-action-second-edition" },
          { t: "repo", title: "DapperLib/Dapper", by: "The micro-ORM alternative", url: "https://github.com/DapperLib/Dapper" },
          { t: "lab", title: "Persist and retrieve data with EF Core", by: "Microsoft Learn", url: "https://learn.microsoft.com/training/modules/persist-data-ef-core/" },
        ],
        tasks: [
          "N+1 hunt (create, detect, fix)",
          "Migration drill: add a non-nullable column to a populated table",
          "Dapper side-by-side benchmark",
        ],
        outcomes:
          "Can detect and fix query performance issues. Knows when to use EF vs Dapper.",
      },
      {
        title: "Testing Seriously",
        summary: "Tests that catch real bugs, backed by real databases.",
        time: "~2 weeks",
        theory: [
          "Test pyramid, when each layer pays off",
          "xUnit fixtures, theories, collection fixtures",
          "WebApplicationFactory<T> for integration tests",
          "NSubstitute/Moq — and why over-mocking is an anti-pattern",
          "Testcontainers",
        ],
        resources: [
          { t: "video", title: "Integration Testing in ASP.NET Core", by: "Nick Chapsas · YouTube", url: yt("Nick Chapsas Integration Testing ASP.NET Core") },
          { t: "doc", title: "Integration tests in ASP.NET Core", by: "learn.microsoft.com", url: "https://learn.microsoft.com/aspnet/core/test/integration-tests" },
          { t: "doc", title: "xUnit.net — Getting Started", by: "xunit.net", url: "https://xunit.net/docs/getting-started/netcore/cmdline" },
          { t: "article", title: "Mocks Aren't Stubs", by: "Martin Fowler", url: "https://martinfowler.com/articles/mocksArentStubs.html" },
          { t: "book", title: "Unit Testing: Principles, Practices, and Patterns", by: "Vladimir Khorikov (Manning)", url: "https://www.manning.com/books/unit-testing" },
          { t: "article", title: "enterprisecraftsmanship.com", by: "Vladimir Khorikov — free testing material", url: "https://enterprisecraftsmanship.com/" },
          { t: "repo", title: "testcontainers/testcontainers-dotnet", by: "Real databases in tests", url: "https://github.com/testcontainers/testcontainers-dotnet" },
          { t: "lab", title: "Test ASP.NET Core applications", by: "Microsoft Learn", url: "https://learn.microsoft.com/training/browse/?terms=test%20ASP.NET%20Core" },
        ],
        tasks: [
          "Drive an API to 80% coverage with meaningful tests",
          "Integration suite with WebApplicationFactory + Testcontainers",
        ],
        outcomes:
          "Writes tests that catch real bugs. Integration tests run against real databases.",
      },
      {
        title: "Observability & Delivery",
        summary: "Logs, traces, Docker, and a CI/CD pipeline that ships.",
        time: "~2 weeks",
        theory: [
          "Structured logging with Serilog",
          "OpenTelemetry (traces, metrics, logs)",
          "Health checks",
          "Dockerizing .NET (multi-stage builds)",
          "CI/CD with GitHub Actions",
        ],
        resources: [
          { t: "video", title: "OpenTelemetry in .NET", by: "Nick Chapsas · YouTube", url: yt("Nick Chapsas OpenTelemetry .NET") },
          { t: "doc", title: "OpenTelemetry for .NET", by: "opentelemetry.io", url: "https://opentelemetry.io/docs/languages/net/" },
          { t: "repo", title: ".NET Docker samples", by: "dotnet/dotnet-docker", url: "https://github.com/dotnet/dotnet-docker/tree/main/samples" },
          { t: "article", title: "Structured logging concepts in .NET", by: "Nicholas Blumhardt (Serilog author)", url: "https://nblumhardt.com/2016/06/structured-logging-concepts-in-net-series-1/" },
          { t: "book", title: "Serilog documentation", by: "serilog.net", url: "https://serilog.net/" },
          { t: "repo", title: "open-telemetry/opentelemetry-dotnet", by: "Read the /examples folder", url: "https://github.com/open-telemetry/opentelemetry-dotnet" },
          { t: "lab", title: "Deploy .NET apps with GitHub Actions", by: "Microsoft Learn", url: "https://learn.microsoft.com/training/browse/?terms=GitHub%20Actions%20.NET" },
        ],
        tasks: [
          "Full GitHub Actions pipeline (restore → build → test → Docker → publish)",
          "OpenTelemetry traces from controller to database in Jaeger",
        ],
        outcomes:
          "Has a working CI/CD pipeline. Can trace requests across services. Production-ready.",
      },
    ],
  },

  {
    id: "senior",
    name: "Senior Track",
    tagline: "DDD → Distributed Systems → Production Mastery",
    tag: "6 Modules",
    accent: ACCENT.senior,
    capstone: {
      name: "LedgerMesh — Event-Sourced Distributed Ledger",
      blurb:
        "A distributed, event-sourced system you can design, operate, and document.",
    },
    modules: [
      {
        title: "DDD & Clean Architecture",
        summary: "Structure code around the business, not the framework.",
        time: "~3 weeks",
        theory: [
          "Strategic DDD (bounded contexts, context maps, ubiquitous language)",
          "Tactical DDD (entities, value objects, aggregates, domain events)",
          "Clean/Hexagonal/Onion architecture",
          "CQRS: when it helps, when it's cargo-culting",
          "The MediatR debate",
        ],
        resources: [
          { t: "book", title: "Domain-Driven Design Distilled", by: "Vaughn Vernon — read this first", url: "https://www.oreilly.com/library/view/domain-driven-design-distilled/9780134434964/" },
          { t: "book", title: "Domain-Driven Design", by: "Eric Evans — the original", url: "https://www.oreilly.com/library/view/domain-driven-design-tackling/0321125215/" },
          { t: "article", title: "jimmybogard.com", by: "Jimmy Bogard — author of MediatR", url: "https://www.jimmybogard.com/" },
          { t: "article", title: "BoundedContext & CQRS", by: "Martin Fowler (bliki)", url: "https://martinfowler.com/bliki/BoundedContext.html" },
          { t: "repo", title: "dotnet-architecture/eShopOnWeb", by: "Microsoft's Clean Architecture + DDD", url: "https://github.com/dotnet-architecture/eShopOnWeb" },
          { t: "repo", title: "kgrzybek/modular-monolith-with-ddd", by: "Best .NET DDD + outbox reference", url: "https://github.com/kgrzybek/modular-monolith-with-ddd" },
          { t: "lab", title: "Design a DDD-oriented microservice", by: "Microsoft Learn", url: "https://learn.microsoft.com/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/" },
        ],
        tasks: [
          "Refactor CRUD into DDD (Domain/Application/Infrastructure/Api layers)",
          "Event storming exercise on a real-world domain",
        ],
        outcomes:
          "Can restructure a codebase around business domains. Understands aggregate boundaries.",
      },
      {
        title: "Performance Engineering",
        summary: "Profile, benchmark, and optimize with data, not guesses.",
        time: "~3 weeks",
        theory: [
          "BenchmarkDotNet",
          "Profiling (dotnet-trace, dotnet-counters, PerfView)",
          "JIT, tiered compilation, Native AOT",
          "Lock-free primitives (Interlocked, ConcurrentDictionary)",
          "p50/p95/p99 thinking",
        ],
        resources: [
          { t: "article", title: "Performance Improvements in .NET", by: "Stephen Toub (annual) — read the last 3 years", url: "https://devblogs.microsoft.com/dotnet/performance-improvements-in-net-9/" },
          { t: "doc", title: "BenchmarkDotNet", by: "benchmarkdotnet.org", url: "https://benchmarkdotnet.org/" },
          { t: "doc", title: ".NET diagnostic tools", by: "learn.microsoft.com", url: "https://learn.microsoft.com/dotnet/core/diagnostics/" },
          { t: "book", title: "Pro .NET Memory Management", by: "Konrad Kokosa", url: "https://prodotnetmemory.com/" },
          { t: "article", title: "adamsitnik.com", by: "Adam Sitnik — BenchmarkDotNet maintainer", url: "https://adamsitnik.com/" },
          { t: "repo", title: "dotnet/performance", by: "The .NET team's benchmark suite", url: "https://github.com/dotnet/performance" },
        ],
        tasks: [
          "Serializer benchmark (System.Text.Json vs Newtonsoft vs MemoryPack)",
          "Native AOT port — document what breaks",
        ],
        outcomes:
          "Can profile, benchmark, and optimize .NET applications with data, not guesses.",
      },
      {
        title: "Messaging & Event-Driven Architecture",
        summary: "Design systems that talk asynchronously and survive failure.",
        time: "~3 weeks",
        theory: [
          "Sync vs async integration",
          "RabbitMQ, Kafka, Azure Service Bus — trade-offs",
          "Outbox, inbox, saga, idempotency, DLQs",
          "At-least-once vs exactly-once",
          "MassTransit / NServiceBus",
        ],
        resources: [
          { t: "book", title: "Designing Data-Intensive Applications", by: "Martin Kleppmann — non-negotiable", url: "https://dataintensive.net/" },
          { t: "article", title: "microservices.io", by: "Chris Richardson — canonical patterns", url: "https://microservices.io/" },
          { t: "doc", title: "MassTransit documentation", by: "masstransit.io", url: "https://masstransit.io/" },
          { t: "article", title: "kamilgrzybek.com", by: "Kamil Grzybek — outbox & domain events", url: "https://www.kamilgrzybek.com/" },
          { t: "article", title: "Life Beyond Distributed Transactions", by: "Jimmy Bogard", url: "https://www.jimmybogard.com/life-beyond-transactions-implementation-primer/" },
          { t: "repo", title: "kgrzybek/modular-monolith-with-ddd", by: "DDD + outbox reference", url: "https://github.com/kgrzybek/modular-monolith-with-ddd" },
          { t: "book", title: "Building Microservices, 2nd ed.", by: "Sam Newman", url: "https://www.oreilly.com/library/view/building-microservices-2nd/9781492034018/" },
        ],
        tasks: [
          "Transactional outbox from scratch (no library)",
          "3-step order saga with MassTransit + RabbitMQ",
        ],
        outcomes:
          "Can design event-driven systems. Understands exactly-once is (mostly) a lie.",
      },
      {
        title: "Caching, Scaling & Resilience",
        summary: "Cache strategies and stability patterns for systems under load.",
        time: "~3 weeks",
        theory: [
          "Cache strategies (cache-aside, read-through, write-through)",
          "Redis beyond GET/SET",
          "HybridCache (.NET 9), cache stampede",
          "Polly v8 (retry, circuit breaker, bulkhead, hedging)",
          "System.Threading.RateLimiting",
        ],
        resources: [
          { t: "doc", title: "HybridCache in ASP.NET Core", by: "learn.microsoft.com", url: "https://learn.microsoft.com/aspnet/core/performance/caching/hybrid" },
          { t: "doc", title: "Polly documentation", by: "pollydocs.org", url: "https://www.pollydocs.org/" },
          { t: "article", title: "CircuitBreaker", by: "Martin Fowler (bliki)", url: "https://martinfowler.com/bliki/CircuitBreaker.html" },
          { t: "book", title: "Release It!, 2nd ed.", by: "Michael Nygard — stability patterns", url: "https://pragprog.com/titles/mnee2/release-it-second-edition/" },
          { t: "doc", title: "Redis data types", by: "redis.io", url: "https://redis.io/docs/latest/develop/data-types/" },
          { t: "repo", title: "App-vNext/Polly", by: "Read the samples folder", url: "https://github.com/App-vNext/Polly" },
        ],
        tasks: [
          "Cache stampede test + fix with HybridCache",
          "Chaos drill with Polly + fault injection",
        ],
        outcomes:
          "Can design resilient systems. Knows cache strategies and when each applies.",
      },
      {
        title: "Security & Compliance",
        summary: "Real auth with OAuth/OIDC and a threat-modeling mindset.",
        time: "~3 weeks",
        theory: [
          "OAuth 2.1 / OIDC (auth code + PKCE)",
          "Duende IdentityServer or Keycloak",
          "OWASP API Top 10 (2023)",
          "Secrets management",
          "Data Protection APIs",
        ],
        resources: [
          { t: "doc", title: "OWASP API Security Top 10", by: "owasp.org", url: "https://owasp.org/API-Security/" },
          { t: "doc", title: "ASP.NET Core security", by: "learn.microsoft.com", url: "https://learn.microsoft.com/aspnet/core/security/" },
          { t: "doc", title: "Keycloak documentation", by: "keycloak.org", url: "https://www.keycloak.org/documentation" },
          { t: "article", title: "Auth series (cookie & JWT deep dives)", by: "Andrew Lock", url: "https://andrewlock.net/" },
          { t: "doc", title: "OAuth 2.0 / OIDC specs", by: "oauth.net · openid.net", url: "https://oauth.net/2/" },
        ],
        tasks: [
          "Full OIDC setup with Keycloak + .NET API + SPA",
          "STRIDE threat model for your capstone",
        ],
        outcomes:
          "Can implement real auth systems. Thinks about security as a property, not a phase.",
      },
      {
        title: "Production Operations & Technical Leadership",
        summary: "SLOs, incidents, and leading through systems thinking.",
        time: "~3 weeks",
        theory: [
          "SLIs / SLOs / error budgets",
          "Incident response, runbooks, blameless postmortems",
          "Feature flags for progressive delivery",
          "Zero-downtime DB migrations (expand/contract)",
          "ADRs, RFCs, code review as leadership",
        ],
        resources: [
          { t: "book", title: "Site Reliability Engineering", by: "Google SRE team (free online)", url: "https://sre.google/sre-book/table-of-contents/" },
          { t: "article", title: "FeatureToggle & ParallelChange", by: "Martin Fowler", url: "https://martinfowler.com/articles/feature-toggles.html" },
          { t: "repo", title: "architecture-decision-record", by: "Joel Parker Henderson — ADR templates", url: "https://github.com/joelparkerhenderson/architecture-decision-record" },
          { t: "article", title: "Incident Response docs", by: "PagerDuty — free & practical", url: "https://response.pagerduty.com/" },
          { t: "book", title: "The Manager's Path", by: "Camille Fournier — read the Tech Lead chapter", url: "https://www.oreilly.com/library/view/the-managers-path/9781491973882/" },
        ],
        tasks: [
          "Write an ADR for a real architectural decision",
          "Postmortem exercise — break your capstone, write a blameless postmortem",
        ],
        outcomes:
          "Thinks in systems, trade-offs, and organizational impact. Can lead, not just build.",
      },
    ],
  },
];

const PROJECTS = [
  {
    name: "BookVault — Personal Library API",
    track: "Beginner",
    accent: ACCENT.beginner,
    stack: ["ASP.NET Core", "EF Core", "SQLite", "JWT", "Swagger"],
    desc: "The Beginner-track capstone. A complete CRUD REST API to catalog and review books, with EF Core persistence, JWT-protected endpoints, and full Swagger documentation.",
    prove: "You can build, secure, and document a REST API end to end.",
  },
  {
    name: "TaskForge — Multi-Tenant Task Management API",
    track: "Mid-Level",
    accent: ACCENT.midlevel,
    stack: ["ASP.NET Core", "PostgreSQL", "EF Core", "Serilog", "OpenTelemetry", "Docker", "GitHub Actions"],
    desc: "Multi-tenant task management API with JWT auth, background jobs, structured logging, and end-to-end tracing. Integration-tested with Testcontainers and shipped via CI. Stretch: a Blazor/React frontend.",
    prove: "You can build a production-grade, observable, multi-tenant service with CI.",
  },
  {
    name: "LedgerMesh — Event-Sourced Distributed Ledger",
    track: "Senior",
    accent: ACCENT.senior,
    stack: ["RabbitMQ / Kafka", "Marten", "Keycloak", "OpenTelemetry", "Polly", "Docker Compose", "k6"],
    desc: "Three services (Accounts, Ledger, Reporting) communicating over a message bus. Event sourcing with Marten, transactional outbox, OIDC via Keycloak, and a docs/ folder with ADR log, C4 diagram, runbook, and postmortem.",
    prove: "You can design and operate a distributed, event-sourced system.",
  },
  {
    name: "Parallel Web Scraper",
    track: "Mid-Level",
    accent: ACCENT.midlevel,
    stack: ["C#", "Channels", "SemaphoreSlim", "IAsyncEnumerable"],
    desc: "A throttled, concurrent scraper built on a Channels-based producer/consumer pipeline with SemaphoreSlim back-pressure and graceful cancellation.",
    prove: "You can write concurrent code that scales without deadlocking.",
  },
  {
    name: "Transactional Outbox",
    track: "Senior",
    accent: ACCENT.senior,
    stack: ["MassTransit", "RabbitMQ", "PostgreSQL", "EF Core"],
    desc: "Implement the outbox pattern from scratch — no library — then layer a 3-step order saga on top with idempotent consumers and dead-letter handling.",
    prove: "You understand reliable messaging and the myth of exactly-once.",
  },
  {
    name: "Resilience Lab",
    track: "Senior",
    accent: ACCENT.senior,
    stack: ["Polly v8", "Redis", "HybridCache", ".NET 9"],
    desc: "Reproduce a cache stampede and fix it with HybridCache, then run a chaos drill with Polly fault injection — retries, circuit breakers, and bulkheads under load.",
    prove: "You can design systems that degrade gracefully under failure.",
  },
];

const HUB = {
  Books: {
    icon: BookOpen,
    items: [
      { title: "C# in Depth, 4th ed.", by: "Jon Skeet", desc: "The definitive deep-dive into the C# language.", tags: ["Mid", "Senior"], url: "https://csharpindepth.com/" },
      { title: "ASP.NET Core in Action, 3rd ed.", by: "Andrew Lock", desc: "End-to-end guide to building APIs with ASP.NET Core.", tags: ["Beginner", "Mid"], url: "https://www.manning.com/books/asp-net-core-in-action-third-edition" },
      { title: "Entity Framework Core in Action, 2nd ed.", by: "Jon P. Smith", desc: "Master EF Core from the inside out.", tags: ["Beginner", "Mid"], url: "https://www.manning.com/books/entity-framework-core-in-action-second-edition" },
      { title: "Unit Testing: Principles, Practices & Patterns", by: "Vladimir Khorikov", desc: "How to write tests that actually pay off.", tags: ["Mid", "Senior"], url: "https://www.manning.com/books/unit-testing" },
      { title: "Designing Data-Intensive Applications", by: "Martin Kleppmann", desc: "The bible of modern distributed data systems.", tags: ["Senior"], url: "https://dataintensive.net/" },
      { title: "The Phoenix Project", by: "Kim, Behr, Spafford", desc: "A novel that teaches DevOps culture.", tags: ["Mid", "Senior"], url: "https://itrevolution.com/product/the-phoenix-project/" },
      { title: "The DevOps Handbook, 2nd ed.", by: "Kim, Humble, Debois, Willis", desc: "Practical DevOps principles and practices.", tags: ["Mid", "Senior"], url: "https://itrevolution.com/product/the-devops-handbook-second-edition/" },
      { title: "Site Reliability Engineering", by: "Google (free online)", desc: "How Google runs production systems at scale.", tags: ["Senior"], url: "https://sre.google/sre-book/table-of-contents/" },
      { title: "Release It!, 2nd ed.", by: "Michael Nygard", desc: "Stability and resilience patterns for production.", tags: ["Senior"], url: "https://pragprog.com/titles/mnee2/release-it-second-edition/" },
      { title: "Pro .NET Memory Management", by: "Konrad Kokosa", desc: "Everything about the GC and memory in .NET.", tags: ["Mid", "Senior"], url: "https://prodotnetmemory.com/" },
    ],
  },
  YouTube: {
    icon: Youtube,
    items: [
      { title: "Nick Chapsas", by: "youtube.com/@nickchapsas", desc: "Modern C#/.NET features, concise and current.", tags: ["Beginner", "Mid", "Senior"], url: "https://www.youtube.com/@nickchapsas" },
      { title: "Tim Corey", by: "youtube.com/@IAmTimCorey", desc: "Beginner-to-intermediate practical C#.", tags: ["Beginner"], url: "https://www.youtube.com/@IAmTimCorey" },
      { title: "Milan Jovanović", by: "youtube.com/@MilanJovanovicTech", desc: "Architecture and patterns for real apps.", tags: ["Mid", "Senior"], url: "https://www.youtube.com/@MilanJovanovicTech" },
      { title: "Raw Coding", by: "youtube.com/@RawCoding", desc: "Deep ASP.NET Core internals.", tags: ["Mid", "Senior"], url: "https://www.youtube.com/@RawCoding" },
    ],
  },
  Blogs: {
    icon: PenLine,
    items: [
      { title: "Stephen Cleary", by: "blog.stephencleary.com", desc: "The async & concurrency authority.", tags: ["Mid", "Senior"], url: "https://blog.stephencleary.com/" },
      { title: "Andrew Lock", by: "andrewlock.net", desc: "The best ASP.NET Core blog, period.", tags: ["Beginner", "Mid"], url: "https://andrewlock.net/" },
      { title: "Jimmy Bogard", by: "jimmybogard.com", desc: "DDD, MediatR, and patterns.", tags: ["Senior"], url: "https://www.jimmybogard.com/" },
      { title: "Vladimir Khorikov", by: "enterprisecraftsmanship.com", desc: "Testing and DDD done right.", tags: ["Mid", "Senior"], url: "https://enterprisecraftsmanship.com/" },
      { title: "Milan Jovanović", by: "milanjovanovic.tech", desc: "Modern .NET architecture.", tags: ["Mid", "Senior"], url: "https://www.milanjovanovic.tech/" },
      { title: "Kamil Grzybek", by: "kamilgrzybek.com", desc: "Modular monoliths and the outbox pattern.", tags: ["Senior"], url: "https://www.kamilgrzybek.com/" },
      { title: "Oskar Dudycz", by: "event-driven.io", desc: "Event sourcing in .NET.", tags: ["Senior"], url: "https://event-driven.io/" },
      { title: "Microsoft .NET Blog", by: "devblogs.microsoft.com/dotnet", desc: "Official news and deep performance write-ups.", tags: ["Beginner", "Mid", "Senior"], url: "https://devblogs.microsoft.com/dotnet/" },
    ],
  },
  GitHub: {
    icon: Github,
    items: [
      { title: "dotnet/eShop", by: "github.com/dotnet/eShop", desc: "Microsoft's modern .NET reference application.", tags: ["Mid", "Senior"], url: "https://github.com/dotnet/eShop" },
      { title: "jasontaylordev/CleanArchitecture", by: "github.com", desc: "The most popular Clean Architecture template.", tags: ["Mid", "Senior"], url: "https://github.com/jasontaylordev/CleanArchitecture" },
      { title: "ardalis/CleanArchitecture", by: "github.com", desc: "Steve Smith's Clean Architecture variant.", tags: ["Mid", "Senior"], url: "https://github.com/ardalis/CleanArchitecture" },
      { title: "kgrzybek/modular-monolith-with-ddd", by: "github.com", desc: "The reference for DDD + outbox in .NET.", tags: ["Senior"], url: "https://github.com/kgrzybek/modular-monolith-with-ddd" },
      { title: "oskardudycz/EventSourcing.NetCore", by: "github.com", desc: "Event sourcing patterns in .NET.", tags: ["Senior"], url: "https://github.com/oskardudycz/EventSourcing.NetCore" },
    ],
  },
  Labs: {
    icon: FlaskConical,
    items: [
      { title: "C# First Steps", by: "Microsoft Learn", desc: "Guided path from zero to your first C# program.", tags: ["Beginner"], url: "https://learn.microsoft.com/training/paths/csharp-first-steps/" },
      { title: "Build web APIs with ASP.NET Core", by: "Microsoft Learn", desc: "Hands-on API building, beginner to advanced.", tags: ["Beginner", "Mid"], url: "https://learn.microsoft.com/training/paths/create-web-api-aspnet-core/" },
      { title: "Persist data with EF Core", by: "Microsoft Learn", desc: "Interactive EF Core data-access modules.", tags: ["Beginner", "Mid"], url: "https://learn.microsoft.com/training/modules/persist-data-ef-core/" },
      { title: "Test ASP.NET Core applications", by: "Microsoft Learn", desc: "Unit and integration testing labs.", tags: ["Mid"], url: "https://learn.microsoft.com/training/browse/?terms=test%20ASP.NET%20Core" },
      { title: "Deploy .NET apps with GitHub Actions", by: "Microsoft Learn", desc: "Build a CI/CD pipeline step by step.", tags: ["Mid"], url: "https://learn.microsoft.com/training/browse/?terms=GitHub%20Actions%20.NET" },
      { title: "C# async programming scenarios", by: "Killercoda", desc: "Browser-based async/concurrency playgrounds.", tags: ["Mid"], url: "https://killercoda.com/" },
      { title: "Design a DDD-oriented microservice", by: "Microsoft Learn", desc: "Architecture-focused, domain-driven guide.", tags: ["Senior"], url: "https://learn.microsoft.com/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/" },
    ],
  },
};

const NAV_LINKS = [
  { label: "Program Overview", href: "#how-it-works" },
  { label: "Tracks", href: "#tracks" },
  { label: "Resources", href: "#resources" },
  { label: "Projects", href: "#projects" },
];

const TAG_COLOR = {
  Beginner: ACCENT.beginner,
  Mid: ACCENT.midlevel,
  "Mid-Level": ACCENT.midlevel,
  Senior: ACCENT.senior,
};

/* ------------------------------------------------------------------ */
/*  ROOT COMPONENT                                                    */
/* ------------------------------------------------------------------ */

export default function CSharpAzureRoadmap() {
  const [dark, setDark] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTrack, setActiveTrack] = useState("beginner");
  const [expanded, setExpanded] = useState("beginner-0"); // open the first module so it's obvious it's interactive
  const [completed, setCompleted] = useState(() => new Set());
  const [hubTab, setHubTab] = useState("Books");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = prev;
    };
  }, []);

  /* theme tokens */
  const pageBg = dark ? "#0a0a0f" : "#f6f7fb";
  const surface = dark ? "bg-white/[0.03] border-white/[0.06]" : "bg-white border-black/[0.07]";
  const surfaceHover = dark ? "hover:bg-white/[0.05]" : "hover:bg-black/[0.015]";
  const textMain = dark ? "text-slate-100" : "text-slate-900";
  const textMuted = dark ? "text-slate-400" : "text-slate-600";
  const textFaint = dark ? "text-slate-500" : "text-slate-400";
  const navBg = dark ? "bg-[#0a0a0f]/80 border-white/[0.06]" : "bg-white/80 border-black/[0.06]";
  const chipBg = dark ? "bg-white/[0.04] border-white/[0.08]" : "bg-black/[0.03] border-black/[0.08]";
  const hairline = dark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.06)";

  const current = TRACKS.find((t) => t.id === activeTrack);

  const trackStats = useMemo(() => {
    const s = {};
    TRACKS.forEach((t) => {
      s[t.id] = {
        modules: t.modules.length,
        projects: t.modules.reduce((a, m) => a + m.tasks.length, 0),
        resources: t.modules.reduce((a, m) => a + m.resources.length, 0),
      };
    });
    return s;
  }, []);

  const toggleComplete = (key) =>
    setCompleted((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const doneCount = current.modules.filter((_, i) =>
    completed.has(`${current.id}-${i}`)
  ).length;
  const pct = Math.round((doneCount / current.modules.length) * 100);
  const firstIncomplete = current.modules.findIndex(
    (_, i) => !completed.has(`${current.id}-${i}`)
  );

  const openModule = (i) => {
    const key = `${current.id}-${i}`;
    setExpanded(key);
    setTimeout(() => {
      document
        .getElementById(`m-${key}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 30);
  };

  const selectTrack = (id) => {
    setActiveTrack(id);
    setExpanded(`${id}-0`);
    setTimeout(() => {
      document
        .getElementById("roadmap")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 30);
  };

  /* ---------------------------------------------------------------- */
  return (
    <div
      className={`${textMain} min-h-screen w-full overflow-x-hidden antialiased`}
      style={{
        backgroundColor: pageBg,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <style>{`
        @keyframes floatGlow {
          0%,100% { transform: translate(-50%, 0) scale(1); opacity: .55; }
          50%     { transform: translate(-50%, -14px) scale(1.06); opacity: .8; }
        }
        .grad-text {
          background-image: linear-gradient(90deg,#7c3aed,#06b6d4);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .grad-border {
          background:
            linear-gradient(${pageBg},${pageBg}) padding-box,
            linear-gradient(120deg, rgba(124,58,237,.7), rgba(6,182,212,.7)) border-box;
          border: 1px solid transparent;
        }
      `}</style>

      {/* =============================== NAV =============================== */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
          scrolled ? `${navBg} backdrop-blur-xl` : "bg-transparent border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="#top" className="flex items-center gap-2.5 font-semibold">
              <span
                className="grid h-9 w-9 place-items-center rounded-xl text-white shadow-lg"
                style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)" }}
              >
                <Code2 size={18} />
              </span>
              <span className="tracking-tight">
                .NET<span className="grad-text font-bold">Path</span>
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    dark
                      ? "text-slate-400 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                aria-label="Toggle theme"
                onClick={() => setDark((d) => !d)}
                className={`grid h-9 w-9 place-items-center rounded-lg border ${chipBg} ${surfaceHover} transition-all hover:scale-[1.05]`}
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <a
                href="#tracks"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
                style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)" }}
              >
                Start Learning <ArrowRight size={15} />
              </a>
              <button
                aria-label="Menu"
                onClick={() => setNavOpen(true)}
                className={`md:hidden grid h-9 w-9 place-items-center rounded-lg border ${chipBg}`}
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-[60] overflow-hidden md:hidden transition-opacity duration-300 ${
          navOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setNavOpen(false)} />
        <div
          className={`absolute right-0 top-0 h-full w-72 border-l p-6 shadow-2xl transition-transform duration-300 ${
            navOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ backgroundColor: pageBg }}
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="font-semibold">Menu</span>
            <button
              aria-label="Close"
              onClick={() => setNavOpen(false)}
              className={`grid h-9 w-9 place-items-center rounded-lg border ${chipBg}`}
            >
              <X size={18} />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setNavOpen(false)}
                className={`rounded-lg px-3 py-3 text-[15px] font-medium ${textMuted} ${surfaceHover}`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#tracks"
              onClick={() => setNavOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-3 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)" }}
            >
              Start Learning <ArrowRight size={15} />
            </a>
          </nav>
        </div>
      </div>

      {/* =============================== HERO =============================== */}
      <section id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-44 sm:pb-32">
        <div
          className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[820px] max-w-[92vw] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(124,58,237,.35), transparent 60%), radial-gradient(circle at 70% 60%, rgba(6,182,212,.32), transparent 60%)",
            animation: "floatGlow 9s ease-in-out infinite",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <div className={`mx-auto mb-7 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium ${chipBg} ${textMuted}`}>
            <Sparkles size={13} style={{ color: ACCENT.midlevel }} />
            Self-paced · Updated for .NET 9
          </div>

          <h1 className="text-[34px] font-bold leading-[1.08] sm:text-[48px] sm:leading-[1.05] lg:text-[56px]" style={{ letterSpacing: "-0.02em" }}>
            Become a <span className="grad-text">.NET &amp; Azure</span> Developer
          </h1>

          <p className={`mx-auto mt-6 max-w-2xl text-[17px] ${textMuted}`} style={{ lineHeight: 1.7 }}>
            A structured, self-paced roadmap from zero to production. Three tracks.
            Real projects. No fluff.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {[
              ["3", "Tracks"],
              ["30+", "Modules"],
              ["15+", "Portfolio Projects"],
            ].map(([n, l]) => (
              <div key={l} className={`flex items-center gap-2.5 rounded-2xl border px-5 py-3 backdrop-blur-md ${surface}`}>
                <span className="grad-text text-2xl font-bold">{n}</span>
                <span className={`text-sm ${textMuted}`}>{l}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <button
              onClick={() => selectTrack("beginner")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-xl transition-transform hover:scale-[1.03] sm:w-auto"
              style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)" }}
            >
              <Compass size={16} /> New here? Start with Beginner
            </button>
            <a
              href="#how-it-works"
              className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold sm:w-auto ${chipBg} ${surfaceHover} transition-all hover:scale-[1.02]`}
            >
              How it works
            </a>
          </div>
        </div>
      </section>

      {/* ========================= HOW IT WORKS ========================= */}
      <Section id="how-it-works" eyebrow="The Method" title="How it works" sub="Three simple steps. Built for people who learn by shipping, not by watching." textMuted={textMuted} textFaint={textFaint}>
        <div className="relative grid gap-5 md:grid-cols-3">
          {[
            { icon: GitBranch, t: "Choose Your Track", d: "Pick your level: Beginner, Mid-Level, or Senior. Each track builds on the last.", c: ACCENT.beginner },
            { icon: Hammer, t: "Learn by Building", d: "Every module ends with a hands-on project. Theory is only useful when applied.", c: ACCENT.midlevel },
            { icon: Rocket, t: "Ship Your Portfolio", d: "Finish with 5+ GitHub repos that prove your skills to any employer.", c: ACCENT.senior },
          ].map((s, i) => (
            <div key={s.t} className="relative">
              {i < 2 && (
                <div className="absolute right-[-14px] top-1/2 z-10 hidden -translate-y-1/2 md:block" style={{ color: dark ? "#475569" : "#cbd5e1" }}>
                  <ArrowRight size={22} />
                </div>
              )}
              <div className={`h-full rounded-2xl border p-7 backdrop-blur-md transition-all duration-200 hover:scale-[1.02] ${surface}`}>
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl" style={{ background: `${s.c}1a`, color: s.c, border: `1px solid ${s.c}33` }}>
                  <s.icon size={22} />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <span className={`text-xs font-semibold ${textFaint}`}>0{i + 1}</span>
                  <h3 className="text-lg font-semibold">{s.t}</h3>
                </div>
                <p className={`text-[15px] ${textMuted}`} style={{ lineHeight: 1.7 }}>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ========================= TRACK SELECTOR ========================= */}
      <Section id="tracks" eyebrow="Curriculum" title="Choose your track" sub="Pick a track to load its full roadmap below. Every resource is a real, clickable link — videos, docs, books, repos, and labs." textMuted={textMuted} textFaint={textFaint}>
        {/* beginner reassurance */}
        <div className="mb-7 flex items-start gap-3 rounded-2xl border p-4 sm:p-5" style={{ background: `${ACCENT.beginner}0d`, borderColor: `${ACCENT.beginner}33` }}>
          <Compass size={20} className="mt-0.5 shrink-0" style={{ color: ACCENT.beginner }} />
          <p className={`text-[14px] ${textMuted}`} style={{ lineHeight: 1.65 }}>
            <span className={`font-semibold ${textMain}`}>New to all this?</span> Start with the{" "}
            <button onClick={() => selectTrack("beginner")} className="font-semibold underline decoration-dotted underline-offset-2" style={{ color: ACCENT.beginner }}>
              Beginner track
            </button>
            . It assumes zero experience. Work top to bottom — each module ends in a project you build, and finishes with a capstone you can show an employer.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {TRACKS.map((t) => {
            const isActive = activeTrack === t.id;
            const st = trackStats[t.id];
            return (
              <button
                key={t.id}
                onClick={() => selectTrack(t.id)}
                className={`group relative overflow-hidden rounded-2xl border p-7 text-left backdrop-blur-md transition-all duration-200 hover:scale-[1.02] ${surface}`}
                style={
                  isActive
                    ? {
                        borderColor: `${t.accent}80`,
                        background: `${t.accent}0f`,
                        boxShadow: `0 0 0 1px ${t.accent}40, 0 18px 40px -20px ${t.accent}80`,
                      }
                    : undefined
                }
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full blur-2xl transition-opacity" style={{ background: t.accent, opacity: isActive ? 0.22 : 0.08 }} />
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${t.accent}1f`, color: t.accent, border: `1px solid ${t.accent}40` }}>
                      {t.tag}
                    </span>
                    {isActive && (
                      <span className="flex items-center gap-1 text-xs font-medium" style={{ color: t.accent }}>
                        <CircleDot size={13} /> Selected
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold">{t.name}</h3>
                  <p className={`mt-1.5 text-sm ${textMuted}`}>{t.tagline}</p>

                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                    {[
                      [st.modules, "Modules"],
                      [st.projects, "Projects"],
                      [st.resources, "Resources"],
                    ].map(([n, l]) => (
                      <div key={l}>
                        <div className="text-2xl font-bold" style={{ color: t.accent }}>{n}</div>
                        <div className={`text-xs ${textFaint}`}>{l}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-transform group-hover:translate-x-0.5" style={{ color: t.accent }}>
                    View Roadmap <ArrowRight size={15} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ========================= ROADMAP VIEWER ========================= */}
        <div id="roadmap" className="mt-14 scroll-mt-24">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="flex items-center gap-2.5 text-xl font-bold sm:text-2xl">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: current.accent }} />
                {current.name} Roadmap
              </h3>
              <p className={`mt-1 text-sm ${textMuted}`}>{current.tagline}</p>
            </div>
            {firstIncomplete !== -1 ? (
              <button
                onClick={() => openModule(firstIncomplete)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] sm:w-auto"
                style={{ background: current.accent }}
              >
                {doneCount === 0 ? "Start here" : "Continue"} → Module {firstIncomplete + 1}
              </button>
            ) : (
              <a
                href="#projects"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03] sm:w-auto"
                style={{ background: current.accent }}
              >
                <Flag size={15} /> Track complete — see your capstone
              </a>
            )}
          </div>

          {/* progress bar */}
          <div className="mb-5">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className={textMuted}>
                <span className="font-semibold" style={{ color: current.accent }}>{doneCount}</span> / {current.modules.length} modules complete
              </span>
              <span className={textFaint}>{pct}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: dark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.07)" }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: current.accent }} />
            </div>
          </div>

          {/* quick-nav pills */}
          <div className="mb-8 flex flex-wrap gap-2">
            {current.modules.map((m, i) => {
              const key = `${current.id}-${i}`;
              const done = completed.has(key);
              const isOpen = expanded === key;
              return (
                <button
                  key={key}
                  onClick={() => openModule(i)}
                  title={m.title}
                  className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all hover:scale-[1.04]"
                  style={{
                    background: done ? `${current.accent}1a` : isOpen ? `${current.accent}12` : "transparent",
                    borderColor: isOpen || done ? `${current.accent}66` : hairline,
                    color: done || isOpen ? current.accent : (dark ? "#94a3b8" : "#64748b"),
                  }}
                >
                  <span className="grid h-4 w-4 place-items-center rounded-full text-[10px] font-bold" style={{ background: done ? current.accent : "transparent", color: done ? "#fff" : "inherit", border: done ? "none" : `1px solid currentColor` }}>
                    {done ? <Check size={10} /> : i + 1}
                  </span>
                  M{i + 1}
                </button>
              );
            })}
          </div>

          {/* timeline */}
          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-px sm:left-[23px]" style={{ background: dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.08)" }} />
            <div className="flex flex-col gap-4">
              {current.modules.map((m, i) => {
                const key = `${current.id}-${i}`;
                const isOpen = expanded === key;
                const done = completed.has(key);
                const hasNext = i < current.modules.length - 1;
                return (
                  <div key={key} id={`m-${key}`} className="relative scroll-mt-24 pl-12 sm:pl-16">
                    {/* number circle */}
                    <div
                      className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full text-sm font-bold transition-all sm:h-12 sm:w-12"
                      style={{
                        background: done ? current.accent : `${current.accent}1a`,
                        color: done ? "#fff" : current.accent,
                        border: `2px solid ${current.accent}${done ? "" : "59"}`,
                        boxShadow: isOpen ? `0 0 0 4px ${current.accent}22` : "none",
                      }}
                    >
                      {done ? <Check size={18} /> : i + 1}
                    </div>

                    <div className={`overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-200 ${surface}`} style={isOpen ? { borderColor: `${current.accent}55` } : undefined}>
                      {/* header */}
                      <button onClick={() => setExpanded(isOpen ? null : key)} className={`flex w-full items-center gap-2.5 p-4 text-left sm:gap-4 sm:p-5 ${surfaceHover} transition-colors`}>
                        <div className="min-w-0 flex-1">
                          <span className={`text-xs font-semibold ${textFaint}`}>Module {i + 1}</span>
                          <h4 className="mt-0.5 truncate text-lg font-semibold">{m.title}</h4>
                          <p className={`mt-0.5 text-sm ${textMuted}`}>{m.summary}</p>
                          <div className={`mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs ${textFaint}`}>
                            <span className="inline-flex items-center gap-1"><BookOpen size={12} /> {m.resources.length} resources</span>
                            <span className="inline-flex items-center gap-1"><Hammer size={12} /> {m.tasks.length} tasks</span>
                            <span className="inline-flex items-center gap-1"><Clock size={12} /> {m.time}</span>
                          </div>
                        </div>

                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => { e.stopPropagation(); toggleComplete(key); }}
                          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); toggleComplete(key); } }}
                          className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-md border transition-all hover:scale-110"
                          style={{ background: done ? current.accent : "transparent", borderColor: done ? current.accent : dark ? "#475569" : "#cbd5e1" }}
                          aria-label="Mark complete"
                        >
                          {done && <Check size={15} color="#fff" />}
                        </span>

                        <ChevronDown size={20} className={`shrink-0 transition-transform duration-200 ${textFaint} ${isOpen ? "rotate-180" : ""}`} />
                      </button>

                      {/* body */}
                      <div className="overflow-hidden transition-all duration-300 ease-out" style={{ maxHeight: isOpen ? 4000 : 0 }}>
                        <div className="space-y-7 px-5 pb-7 pt-1" style={{ borderTop: `1px solid ${hairline}` }}>
                          <Block label="Theory Topics" accent={current.accent}>
                            <ul className="grid gap-2 sm:grid-cols-2">
                              {m.theory.map((th, k) => (
                                <li key={k} className={`flex gap-2.5 text-[14px] ${textMuted}`} style={{ lineHeight: 1.6 }}>
                                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: current.accent }} />
                                  {th}
                                </li>
                              ))}
                            </ul>
                          </Block>

                          <Block label="Resources" accent={current.accent} hint="Click to open">
                            <div className="grid gap-2">
                              {m.resources.map((r, k) => (
                                <ResourceRow key={k} r={r} accent={current.accent} dark={dark} chipBg={chipBg} textMain={textMain} textMuted={textMuted} textFaint={textFaint} />
                              ))}
                            </div>
                          </Block>

                          <Block label="Practical Tasks" accent={current.accent}>
                            <ol className="grid gap-2.5">
                              {m.tasks.map((task, k) => (
                                <li key={k} className="flex gap-3">
                                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-xs font-bold" style={{ background: `${current.accent}1a`, color: current.accent }}>{k + 1}</span>
                                  <span className={`text-[14px] ${textMuted}`} style={{ lineHeight: 1.6 }}>{task}</span>
                                </li>
                              ))}
                            </ol>
                          </Block>

                          <Block label="Expected Outcomes" accent={current.accent}>
                            <div className="rounded-xl border p-4 text-[14px]" style={{ background: `${current.accent}0d`, borderColor: `${current.accent}33`, lineHeight: 1.65 }}>
                              {m.outcomes}
                            </div>
                          </Block>

                          {/* wayfinding footer */}
                          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                            <button
                              onClick={() => toggleComplete(key)}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all hover:scale-[1.02] sm:w-auto"
                              style={{ borderColor: `${current.accent}55`, color: current.accent, background: done ? `${current.accent}14` : "transparent" }}
                            >
                              <Check size={15} /> {done ? "Marked done" : "Mark as done"}
                            </button>
                            {hasNext ? (
                              <button
                                onClick={() => { if (!done) toggleComplete(key); openModule(i + 1); }}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] sm:w-auto"
                                style={{ background: current.accent }}
                              >
                                Next: Module {i + 2} <ArrowRight size={15} />
                              </button>
                            ) : (
                              <a
                                href="#projects"
                                onClick={() => { if (!done) toggleComplete(key); }}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] sm:w-auto"
                                style={{ background: current.accent }}
                              >
                                <Flag size={15} /> Finish → your capstone
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* capstone finish line */}
              <div className="relative pl-12 sm:pl-16">
                <div className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full sm:h-12 sm:w-12" style={{ background: `${current.accent}1a`, color: current.accent, border: `2px dashed ${current.accent}80` }}>
                  <Flag size={18} />
                </div>
                <a href="#projects" className={`block rounded-2xl border p-5 backdrop-blur-md transition-all duration-200 hover:scale-[1.01] ${surface}`} style={{ borderColor: `${current.accent}44` }}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: current.accent }}>Finish line · Capstone</span>
                      <h4 className="mt-1 text-lg font-semibold">{current.capstone.name}</h4>
                      <p className={`mt-0.5 text-sm ${textMuted}`}>{current.capstone.blurb}</p>
                    </div>
                    <ArrowRight size={20} className="shrink-0" style={{ color: current.accent }} />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ========================= PROJECTS ========================= */}
      <Section id="projects" eyebrow="Proof of Work" title="Capstone projects" sub="You finish each track with repos a hiring manager can actually open. Real stacks, real scope." textMuted={textMuted} textFaint={textFaint}>
        <div className="grid gap-5 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <div
              key={p.name}
              className={`group relative overflow-hidden rounded-2xl border p-7 backdrop-blur-md transition-all duration-200 hover:scale-[1.015] ${surface}`}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${p.accent}66`; e.currentTarget.style.boxShadow = `0 22px 50px -28px ${p.accent}`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold leading-tight">{p.name}</h3>
                <span className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: `${p.accent}1f`, color: p.accent, border: `1px solid ${p.accent}40` }}>{p.track}</span>
              </div>
              <p className={`text-[14px] ${textMuted}`} style={{ lineHeight: 1.65 }}>{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className={`rounded-md border px-2 py-1 text-[11.5px] font-medium ${chipBg} ${textMuted}`} style={{ fontFamily: "'JetBrains Mono','Fira Code',ui-monospace,monospace" }}>{s}</span>
                ))}
              </div>
              <div className="mt-5 flex items-start gap-2 border-t pt-4 text-[13.5px]" style={{ borderColor: hairline }}>
                <span className="mt-0.5 shrink-0 font-semibold" style={{ color: p.accent }}>What you'll prove:</span>
                <span className={textMuted}>{p.prove}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ========================= RESOURCES HUB ========================= */}
      <Section id="resources" eyebrow="Curated, not exhaustive" title="Resources hub" sub="The best-of list — every card links straight to the source. The people and repos worth your time, tagged by where they fit." textMuted={textMuted} textFaint={textFaint}>
        <div className="mb-7 flex flex-wrap gap-2">
          {Object.keys(HUB).map((tab) => {
            const Icon = HUB[tab].icon;
            const active = hubTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setHubTab(tab)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${active ? "text-white" : `${chipBg} ${textMuted} ${surfaceHover}`}`}
                style={active ? { background: "linear-gradient(135deg,#7c3aed,#06b6d4)", borderColor: "transparent" } : undefined}
              >
                <Icon size={15} />
                {tab}
                <span className={`rounded-md px-1.5 text-[11px] ${active ? "bg-white/20" : chipBg}`}>{HUB[tab].items.length}</span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HUB[hubTab].items.map((it) => {
            const Icon = HUB[hubTab].icon;
            return (
              <a
                key={it.title}
                href={it.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex flex-col rounded-2xl border p-5 backdrop-blur-md transition-all duration-200 hover:scale-[1.02] ${surface}`}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${ACCENT.midlevel}55`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${chipBg}`}>
                    <Icon size={16} className={textMuted} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-[15px] font-semibold group-hover:underline">{it.title}</h4>
                    <p className={`truncate text-xs ${textFaint}`}>{it.by}</p>
                  </div>
                  <ExternalLink size={14} className={`shrink-0 opacity-0 transition-opacity group-hover:opacity-100 ${textFaint}`} />
                </div>
                <p className={`flex-1 text-[13.5px] ${textMuted}`} style={{ lineHeight: 1.6 }}>{it.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {it.tags.map((tag) => (
                    <span key={tag} className="rounded-full px-2 py-0.5 text-[10.5px] font-semibold" style={{ background: `${TAG_COLOR[tag]}1a`, color: TAG_COLOR[tag], border: `1px solid ${TAG_COLOR[tag]}33` }}>{tag}</span>
                  ))}
                </div>
              </a>
            );
          })}
        </div>
      </Section>

      {/* ========================= FOOTER ========================= */}
      <footer className="relative mt-10 border-t" style={{ borderColor: hairline }}>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="grad-border mx-auto max-w-3xl rounded-2xl p-8 text-center sm:p-10">
            <Layers size={26} className="mx-auto mb-5" style={{ color: ACCENT.midlevel }} />
            <p className="text-xl font-medium italic sm:text-2xl" style={{ letterSpacing: "-0.01em", lineHeight: 1.5 }}>
              “Make it work, make it right, make it fast — in that order.”
            </p>
            <p className={`mt-3 text-sm ${textFaint}`}>— Kent Beck</p>
          </div>

          <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg text-white" style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)" }}>
                <Code2 size={16} />
              </span>
              <span className="text-sm font-medium">Built for the next generation of .NET developers</span>
            </div>

            <div className="flex items-center gap-2">
              {[
                { icon: Github, label: "GitHub", url: "https://github.com/dotnet" },
                { icon: BookOpen, label: "Microsoft Learn", url: "https://learn.microsoft.com/dotnet/" },
                { icon: PenLine, label: ".NET Blog", url: "https://devblogs.microsoft.com/dotnet/" },
              ].map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" title={s.label} className={`grid h-9 w-9 place-items-center rounded-lg border ${chipBg} ${surfaceHover} transition-all hover:scale-110`}>
                  <s.icon size={16} className={textMuted} />
                </a>
              ))}
            </div>
          </div>

          <div className={`mt-10 border-t pt-6 text-center text-xs ${textFaint}`} style={{ borderColor: hairline }}>
            Curated by Your Name · A self-paced C# .NET &amp; Azure training program
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PRESENTATIONAL HELPERS                                             */
/* ------------------------------------------------------------------ */

function ResourceRow({ r, accent, dark, chipBg, textMain, textMuted, textFaint }) {
  const meta = RES_META[r.t];
  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-3 rounded-lg border px-3.5 py-2.5 transition-all ${chipBg}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${accent}66`;
        e.currentTarget.style.background = `${accent}0f`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.background = "";
      }}
    >
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-sm" style={{ background: dark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.04)" }}>
        {meta.icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className={`block truncate text-[14px] font-medium ${textMain} group-hover:underline`} style={{ textDecorationColor: accent }}>
          {r.title}
        </span>
        <span className={`block truncate text-xs ${textFaint}`}>
          <span className="font-medium" style={{ color: accent }}>{meta.label}</span>
          {" · "}{r.by}
        </span>
      </span>
      <ExternalLink size={15} className="shrink-0 opacity-40 transition-opacity group-hover:opacity-100" style={{ color: accent }} />
    </a>
  );
}

function Section({ id, eyebrow, title, sub, children, textMuted, textFaint }) {
  return (
    <section id={id} className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 max-w-2xl">
          <div className={`mb-3 text-xs font-semibold uppercase tracking-[0.18em] ${textFaint}`}>{eyebrow}</div>
          <h2 className="text-3xl font-bold sm:text-[40px]" style={{ letterSpacing: "-0.02em" }}>{title}</h2>
          {sub && <p className={`mt-4 text-[16px] ${textMuted}`} style={{ lineHeight: 1.7 }}>{sub}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function Block({ label, accent, hint, children }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span className="h-3.5 w-1 rounded-full" style={{ background: accent }} />
        <h5 className="text-xs font-bold uppercase tracking-[0.14em]">{label}</h5>
        {hint && <span className="text-[10px] font-medium uppercase tracking-wide opacity-50">· {hint}</span>}
      </div>
      {children}
    </div>
  );
}
