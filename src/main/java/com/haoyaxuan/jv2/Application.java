package com.haoyaxuan.jv2;

import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * <p>Class: Application</p>
 * <p>Description: jv2-ui</p>
 *
 * @author haoyaxuan@aliyun.com
 * @version 1.0
 * @date 2020/4/30
 */
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(Application.class);
        app.setBannerMode(Banner.Mode.OFF);
        app.run(args);
    }
}
