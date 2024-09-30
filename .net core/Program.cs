using DemoCsfrToken.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    // Permite o envio de cookies
                    .AllowCredentials();
        });
});

builder.Services.AddAntiforgery(options =>
{
    options.HeaderName = "x-csrf-token";
});

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.SameSite = SameSiteMode.Strict;
});

builder.Configuration
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json", true, true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", true, true)
    .AddEnvironmentVariables();


builder.Services.AddSwaggerConfig();

builder.Services.AddApiConfig();

builder.Services.AddMvc();

builder.Services.ResolveDependencies();

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");

app.UseApiConfig(app.Environment);

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Your API v1");
    options.RoutePrefix = string.Empty;
});

app.Run();
