SKILLS_REF := uvx --from skills-ref==0.1.1 agentskills

.PHONY: check
check:
	@for d in skills/*/; do $(SKILLS_REF) validate "$$d" || exit 1; done
