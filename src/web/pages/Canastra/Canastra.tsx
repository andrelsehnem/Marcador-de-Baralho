import React, { useEffect, useState, useMemo } from 'react';
import { useTheme } from '../../../shared/contexts/ThemeContext';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import ThemeToggle from '../../../shared/components/ThemeToggle/ThemeToggle';
import { AdsterraSlot } from '../../../shared/components/Adsterra/Adsterra';
import {
  CanastraGame,
  CanastraConfig,
  Score,
  DEFAULT_GAME,
  DEFAULT_CONFIG,
} from './types';
import './Canastra.css';

interface CanastraProps {
  onNavigate: (page: string) => void;
}

const STORAGE_KEY = 'canastra-web-v1';

const Canastra: React.FC<CanastraProps> = ({ onNavigate }) => {
  const { theme, colors } = useTheme();
  const { isDesktop } = useResponsive();

  // Estado principal do jogo
  const [game, setGame] = useState<CanastraGame>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return DEFAULT_GAME;
    }
    try {
      return JSON.parse(saved) as CanastraGame;
    } catch {
      return DEFAULT_GAME;
    }
  });

  // Estado para modais
  const [showConfigModal, setShowConfigModal] = useState(game.vencedor === null && game.pontosTime1.length === 0);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [editingScoreId, setEditingScoreId] = useState<{ timeId: 'time1' | 'time2'; scoreId: string } | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');

  // Config modal state
  const [tempConfig, setTempConfig] = useState<CanastraConfig>(game.configPadrao);

  // Persistência automática
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
  }, [game]);

  // Monitorar vencedor
  useEffect(() => {
    if (game.vencedor && !showFinishModal) {
      setShowFinishModal(true);
    }
  }, [game.vencedor, showFinishModal]);

  // Calcular total de pontos
  const calcTotal = (scores: Score[]): number => {
    return scores.reduce((sum, s) => sum + s.valor, 0);
  };

  const totalTime1 = useMemo(() => calcTotal(game.pontosTime1), [game.pontosTime1]);
  const totalTime2 = useMemo(() => calcTotal(game.pontosTime2), [game.pontosTime2]);

  // Detectar vencedor
  const checkWinner = (t1: number, t2: number, config: CanastraConfig): 'time1' | 'time2' | null => {
    if (t1 >= config.pontosFinais) return 'time1';
    if (t2 >= config.pontosFinais) return 'time2';
    return null;
  };

  // Ações
  const addScore = (timeId: 'time1' | 'time2', valor: number) => {
    if (valor <= 0 || game.vencedor) return;

    const newScore: Score = {
      id: `${Date.now()}-${Math.random()}`,
      valor,
      timestamp: Date.now(),
    };

    setGame((prev) => {
      let novosPontos1 = prev.pontosTime1;
      let novosPontos2 = prev.pontosTime2;

      if (timeId === 'time1') {
        novosPontos1 = [...prev.pontosTime1, newScore];
      } else {
        novosPontos2 = [...prev.pontosTime2, newScore];
      }

      const newTotal1 = calcTotal(novosPontos1);
      const newTotal2 = calcTotal(novosPontos2);
      const vencedor = checkWinner(newTotal1, newTotal2, prev.configPadrao);

      return {
        ...prev,
        pontosTime1: novosPontos1,
        pontosTime2: novosPontos2,
        vencedor,
      };
    });
  };

  const editScore = (timeId: 'time1' | 'time2', scoreId: string, novoValor: number) => {
    if (novoValor < 0 || game.vencedor) return;

    setGame((prev) => {
      let novosPontos1 = prev.pontosTime1;
      let novosPontos2 = prev.pontosTime2;

      if (timeId === 'time1') {
        novosPontos1 = prev.pontosTime1.map((s) =>
          s.id === scoreId ? { ...s, valor: novoValor } : s
        );
      } else {
        novosPontos2 = prev.pontosTime2.map((s) =>
          s.id === scoreId ? { ...s, valor: novoValor } : s
        );
      }

      const newTotal1 = calcTotal(novosPontos1);
      const newTotal2 = calcTotal(novosPontos2);
      const vencedor = checkWinner(newTotal1, newTotal2, prev.configPadrao);

      return {
        ...prev,
        pontosTime1: novosPontos1,
        pontosTime2: novosPontos2,
        vencedor,
      };
    });

    setEditingScoreId(null);
  };

  const deleteScore = (timeId: 'time1' | 'time2', scoreId: string) => {
    if (game.vencedor) return;

    setGame((prev) => {
      let novosPontos1 = prev.pontosTime1;
      let novosPontos2 = prev.pontosTime2;

      if (timeId === 'time1') {
        novosPontos1 = prev.pontosTime1.filter((s) => s.id !== scoreId);
      } else {
        novosPontos2 = prev.pontosTime2.filter((s) => s.id !== scoreId);
      }

      const newTotal1 = calcTotal(novosPontos1);
      const newTotal2 = calcTotal(novosPontos2);
      const vencedor = checkWinner(newTotal1, newTotal2, prev.configPadrao);

      return {
        ...prev,
        pontosTime1: novosPontos1,
        pontosTime2: novosPontos2,
        vencedor,
      };
    });
  };

  const applyConfig = (config: CanastraConfig) => {
    setGame((prev) => {
      const vencedor = checkWinner(totalTime1, totalTime2, config);
      return {
        ...prev,
        configPadrao: config,
        vencedor,
      };
    });
    setShowConfigModal(false);
  };

  const startNewGame = () => {
    const newGame = DEFAULT_GAME;
    setGame(newGame);
    setTempConfig(newGame.configPadrao);
    setShowFinishModal(false);
    setShowConfigModal(true);
  };

  const handleVoltar = () => {
    onNavigate('lista-jogos');
  };

  // Paleta de cores
  const isDark = theme === 'dark';
  const palette = useMemo(
    () => ({
      pageBg: isDark ? colors.background.dark : colors.background.light,
      headerBg: isDark
        ? `linear-gradient(135deg, ${colors.background.dark2} 0%, #111c35 100%)`
        : `linear-gradient(135deg, ${colors.surface} 0%, #e9eef8 100%)`,
      headerBorder: isDark ? '#2f3d61' : '#c7d2e5',
      text: isDark ? colors.text.dark : colors.text.light,
      textSecondary: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
      divider: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      inputBg: isDark ? 'rgba(15,23,42,0.62)' : 'rgba(255,255,255,0.82)',
      inputBorder: isDark ? 'rgba(255,255,255,0.34)' : 'rgba(15,23,42,0.32)',
      buttonPrimary: colors.primaryDark,
      buttonHover: colors.primary,
      dangerBg: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)',
      dangerBorder: isDark ? '#dc2626' : '#ef4444',
      successBg: isDark ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.05)',
    }),
    [isDark, colors]
  );

  const rootStyle = {
    '--canastra-page-bg': palette.pageBg,
    '--canastra-header-bg': palette.headerBg,
    '--canastra-header-border': palette.headerBorder,
    '--canastra-text': palette.text,
    '--canastra-text-secondary': palette.textSecondary,
    '--canastra-divider': palette.divider,
    '--canastra-input-bg': palette.inputBg,
    '--canastra-input-border': palette.inputBorder,
    '--canastra-button-primary': palette.buttonPrimary,
    '--canastra-button-hover': palette.buttonHover,
    '--canastra-danger-bg': palette.dangerBg,
    '--canastra-danger-border': palette.dangerBorder,
    '--canastra-success-bg': palette.successBg,
  } as React.CSSProperties;

  return (
    <div className="canastra-page" style={rootStyle}>
      <h1 className="sr-only">Marcador de Canastra</h1>

      {/* Header */}
      <header className="canastra-header">
        <button className="canastra-back" onClick={handleVoltar}>
          ← Voltar
        </button>
        <div className="canastra-header-center">
          <span className="canastra-header-title">MARCADOR DE CANASTRA</span>
        </div>
        <div className="canastra-header-tools">
          <button
            className="canastra-config-btn"
            onClick={() => setShowConfigModal(true)}
            title="Configurações"
          >
            ⚙️
          </button>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="canastra-main">
        {/* Time 1 */}
        <section className="canastra-team canastra-team-1">
          <div className="canastra-team-header">
            <h2 className="canastra-team-name">{game.nomeTime1}</h2>
            <div className="canastra-team-total">{totalTime1}</div>
          </div>

          <div className="canastra-historico">
            {game.pontosTime1.length === 0 ? (
              <p className="canastra-empty">Nenhuma pontuação ainda</p>
            ) : (
              game.pontosTime1.map((score) => (
                <div key={score.id} className="canastra-score-item">
                  {editingScoreId?.timeId === 'time1' && editingScoreId?.scoreId === score.id ? (
                    <div className="canastra-score-edit">
                      <input
                        autoFocus
                        type="number"
                        min="0"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        onBlur={() => {
                          const valor = parseInt(editingValue) || 0;
                          editScore('time1', score.id, valor);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const valor = parseInt(editingValue) || 0;
                            editScore('time1', score.id, valor);
                          } else if (e.key === 'Escape') {
                            setEditingScoreId(null);
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <>
                      <span
                        className="canastra-score-value"
                        onClick={() => {
                          setEditingScoreId({ timeId: 'time1', scoreId: score.id });
                          setEditingValue(score.valor.toString());
                        }}
                      >
                        {score.valor}
                      </span>
                      <button
                        className="canastra-delete-btn"
                        onClick={() => deleteScore('time1', score.id)}
                        title="Deletar"
                      >
                        ✕
                      </button>
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="canastra-input-section">
            <input
              type="number"
              className="canastra-input"
              placeholder="Digite a pontuação"
              min="0"
              id="input-time1"
            />
            <button
              className="canastra-add-btn"
              onClick={() => {
                const input = document.getElementById('input-time1') as HTMLInputElement;
                const valor = parseInt(input.value) || 0;
                if (valor > 0) {
                  addScore('time1', valor);
                  input.value = '';
                }
              }}
            >
              + Adicionar
            </button>
          </div>
        </section>

        {/* Divider */}
        <div className="canastra-divider" />

        {/* Time 2 */}
        <section className="canastra-team canastra-team-2">
          <div className="canastra-team-header">
            <h2 className="canastra-team-name">{game.nomeTime2}</h2>
            <div className="canastra-team-total">{totalTime2}</div>
          </div>

          <div className="canastra-historico">
            {game.pontosTime2.length === 0 ? (
              <p className="canastra-empty">Nenhuma pontuação ainda</p>
            ) : (
              game.pontosTime2.map((score) => (
                <div key={score.id} className="canastra-score-item">
                  {editingScoreId?.timeId === 'time2' && editingScoreId?.scoreId === score.id ? (
                    <div className="canastra-score-edit">
                      <input
                        autoFocus
                        type="number"
                        min="0"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        onBlur={() => {
                          const valor = parseInt(editingValue) || 0;
                          editScore('time2', score.id, valor);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const valor = parseInt(editingValue) || 0;
                            editScore('time2', score.id, valor);
                          } else if (e.key === 'Escape') {
                            setEditingScoreId(null);
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <>
                      <span
                        className="canastra-score-value"
                        onClick={() => {
                          setEditingScoreId({ timeId: 'time2', scoreId: score.id });
                          setEditingValue(score.valor.toString());
                        }}
                      >
                        {score.valor}
                      </span>
                      <button
                        className="canastra-delete-btn"
                        onClick={() => deleteScore('time2', score.id)}
                        title="Deletar"
                      >
                        ✕
                      </button>
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="canastra-input-section">
            <input
              type="number"
              className="canastra-input"
              placeholder="Digite a pontuação"
              min="0"
              id="input-time2"
            />
            <button
              className="canastra-add-btn"
              onClick={() => {
                const input = document.getElementById('input-time2') as HTMLInputElement;
                const valor = parseInt(input.value) || 0;
                if (valor > 0) {
                  addScore('time2', valor);
                  input.value = '';
                }
              }}
            >
              + Adicionar
            </button>
          </div>
        </section>
      </main>

      {/* Modal de Configuração */}
      {showConfigModal && (
        <div className="canastra-modal-overlay" onClick={() => setShowConfigModal(false)}>
          <div className="canastra-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="canastra-modal-title">Configurações da Partida</h3>

            <div className="canastra-config-group">
              <label htmlFor="config-final">Pontuação Final para Ganhar:</label>
              <input
                id="config-final"
                type="number"
                min="100"
                value={tempConfig.pontosFinais}
                onChange={(e) =>
                  setTempConfig((prev) => ({
                    ...prev,
                    pontosFinais: Math.max(100, parseInt(e.target.value) || 0),
                  }))
                }
              />
            </div>

            <div className="canastra-config-group">
              <label htmlFor="config-mara">Pontuação que Entra na Mara:</label>
              <input
                id="config-mara"
                type="number"
                min="0"
                value={tempConfig.pontosMaras}
                onChange={(e) =>
                  setTempConfig((prev) => ({
                    ...prev,
                    pontosMaras: Math.max(0, parseInt(e.target.value) || 0),
                  }))
                }
              />
            </div>

            <div className="canastra-modal-actions">
              <button
                className="canastra-btn-secondary"
                onClick={() => {
                  setTempConfig(game.configPadrao);
                  setShowConfigModal(false);
                }}
              >
                Cancelar
              </button>
              <button
                className="canastra-btn-primary"
                onClick={() => applyConfig(tempConfig)}
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Fim de Partida */}
      {showFinishModal && game.vencedor && (
        <div className="canastra-modal-overlay">
          <div className="canastra-modal canastra-modal-finish">
            <h3 className="canastra-modal-title">Partida Finalizada! 🎉</h3>

            <div className="canastra-finish-winner">
              <p className="canastra-finish-label">Vencedor:</p>
              <p className="canastra-finish-name">
                {game.vencedor === 'time1' ? game.nomeTime1 : game.nomeTime2}
              </p>
            </div>

            <div className="canastra-finish-scores">
              <div className="canastra-finish-score">
                <span className="canastra-finish-team">{game.nomeTime1}</span>
                <span className="canastra-finish-points">{totalTime1}</span>
              </div>
              <div className="canastra-finish-score">
                <span className="canastra-finish-team">{game.nomeTime2}</span>
                <span className="canastra-finish-points">{totalTime2}</span>
              </div>
            </div>

            <div className="canastra-modal-actions">
              <button
                className="canastra-btn-secondary"
                onClick={() => setShowFinishModal(false)}
              >
                Fechar
              </button>
              <button className="canastra-btn-primary" onClick={startNewGame}>
                Nova Partida
              </button>
            </div>
          </div>
        </div>
      )}

      {isDesktop && (
        <AdsterraSlot
          placement="nativeBannerWeb"
          style={{ margin: '8px auto', maxWidth: 960, padding: '0 12px', boxSizing: 'border-box' }}
        />
      )}
    </div>
  );
};

export default Canastra;
