package net.corda.samples.example.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import static springfox.documentation.builders.PathSelectors.regex;


@Configuration
public class SwaggerConfig {
    @Bean
    public Docket postsApi() {
        return new Docket(DocumentationType.SWAGGER_2).groupName("CordAPP-api")
                .apiInfo(apiInfo()).select().paths(regex("/CordApp.*")).build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title("CordAPP API")
                .description("CordAPP API reference for developers")
                //.termsOfServiceUrl("http://javainuse.com")
                //.contact("javainuse@gmail.com").license("CordApp License")
                .licenseUrl("javainuse@gmail.com").version("1.0").build();
    }
}
