package com.damian.backen.usuarios.app.usuariosapp.auth;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.damian.backen.usuarios.app.usuariosapp.auth.filters.JwtAuthenticationFilter;
import com.damian.backen.usuarios.app.usuariosapp.auth.filters.JwtValidationFilter;

@Configuration
public class SpringSecurityConfig {
    @Autowired
    private AuthenticationConfiguration autenticacionConfiguration;
    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();

    }
    @Bean
    AuthenticationManager authenticationManager() throws Exception{
        return autenticacionConfiguration.getAuthenticationManager();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http)throws Exception {
        return http.authorizeHttpRequests()
                .requestMatchers(HttpMethod.GET,"/**").permitAll()
      /*  .requestMatchers(HttpMethod.GET,"/usuarios").permitAll()
        .requestMatchers(HttpMethod.GET, "/usuarios/{id}").hasAnyRole("USER","ADMIN")
        .requestMatchers(HttpMethod.POST, "/usuarios").hasRole("ADMIN")

       */
        /* una forma 
        .requestMatchers(HttpMethod.PUT, "/usuarios/{id}").hasRole("ADMIN")
        .requestMatchers(HttpMethod.DELETE, "/usuarios/{id}").hasRole("ADMIN")
        */
        // otra forma
        .requestMatchers("/usuarios/**").hasRole("ADMIN")

                .requestMatchers("/usuarios/**").hasRole("ADMIN")

                .anyRequest().authenticated()

                .and()
                .cors().and()
                .addFilter(new JwtAuthenticationFilter(autenticacionConfiguration.getAuthenticationManager()))
                .addFilter(new JwtValidationFilter(autenticacionConfiguration.getAuthenticationManager()))
                .csrf(config-> config.disable())
                .sessionManagement(managet-> managet.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .build();
    }

    
}
