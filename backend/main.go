package main

import (
	"flag"
	"net/http"
	"os"

	"github.com/bytedance/gopkg/util/logger"
	"github.com/gin-gonic/gin"
)

func main() {
	health := flag.Bool("health", false, "check /healthz and exit")
	flag.Parse()

	if *health {
		os.Exit(healthcheck())
	}

	router := gin.Default()

	router.GET("/healthz", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	err := router.Run()
	if err != nil {
		logger.Fatal("Unable to start server: %v", err)
	}
}
